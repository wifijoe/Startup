const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Get posts
apiRouter.get('/posts', async (_req, res) => {
  const posts = await DB.getposts();
  res.send(posts);
});

//Submit post
apiRouter.post('/post', async (req, res) => {
  DB.addPost(req.body)
  const posts = await DB.getposts();
  res.send(posts);
});

//Get DM messages
apiRouter.get('/dmMessages', async (_req, res) => {
  const dmPosts = await DB.getdmPosts();
  res.send(dmPosts);
});
  
//submit DM messages
apiRouter.post('/dmMessage', async (req, res) => {
  DB.addDmPost(req.body);
  const dmPosts = await DB.getdmPosts();
  res.send(dmPosts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});