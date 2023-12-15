const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = config.url;
const client = new MongoClient(url);
const db = client.db('startup');
const postCollection = db.collection('post');
const dmPostCollection = db.collection('dmPost');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
    return userCollection.findOne({username: username});
}

function getUserByToken(token) {
    return userCollection.findOne({token: token});
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);
    return user
}

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

module.exports = {addPost, addDmPost, getposts, getdmPosts, getUser, getUserByToken, createUser};