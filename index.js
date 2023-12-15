const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const DB = require('./database.js');

const authCookieName = "token";

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post("/auth/create", async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({msg: "Existing user"});
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);
    setAuthCookie(res, user.token);

    res.send({
      id: user._id
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({
        id: user._id
      });
      return;
    }
  }
  res.status(401).send({msg: 'username/password is incorrect!'})
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get posts
secureApiRouter.get('/posts', async (_req, res) => {
  const posts = await DB.getposts();
  res.send(posts);
});

//Submit post
secureApiRouter.post('/post', async (req, res) => {
  DB.addPost(req.body)
  const posts = await DB.getposts();
  res.send(posts);
});

//Get DM messages
secureApiRouter.get('/dmMessages', async (_req, res) => {
  const dmPosts = await DB.getdmPosts();
  res.send(dmPosts);
});
  
//submit DM messages
secureApiRouter.post('/dmMessage', async (req, res) => {
  DB.addDmPost(req.body);
  const dmPosts = await DB.getdmPosts();
  res.send(dmPosts);
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});