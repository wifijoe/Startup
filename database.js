const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = config.url
const client = new MongoClient(url);
