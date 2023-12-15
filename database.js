const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = config.url;
const client = new MongoClient(url);
const db = client.db('startup');
const postCollection = db.collection('post');
const dmPostCollection = db.collection('dmPost');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addPost(post) {
    const result = await postCollection.insertOne(post);
    return result
}

async function addDmPost(post) {
    console.log("this is the api: ", post)
    const result = await dmPostCollection.insertOne(post);
    return result
}

function getposts() {
    const cursor = postCollection.find();
    return cursor.toArray();
}

function getdmPosts() {
    const cursor = dmPostCollection.find();
    return cursor.toArray();
}

module.exports = {addPost, addDmPost, getposts, getdmPosts};