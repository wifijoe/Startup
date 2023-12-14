const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get posts
apiRouter.get('/posts', (_req, res) => {
  res.send(posts);
});

//Submit post
apiRouter.post('/post', (req, res) => {
  scores = updatePosts(req.body, posts);
  res.send(posts);
});

//Get DM messages
apiRouter.get('/dmMessages', (_req, res) => {
    res.send(dmPosts);
  });
  
  //submit DM messages
  apiRouter.post('/dmMessage', (req, res) => {
    scores = updatePosts(req.body, dmPosts);
    res.send(dmPosts);
  });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//current posts and allows for the user to submit a new video
//These are put into memory and will be erased if the service is shut down
let posts = [];

let dmPosts = [];

function updatePosts(newPost, posts) {
    posts.push(newPost)
}