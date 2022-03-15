const Router = require('express');
const express = require('express')
const router = express.Router()

// database connection
// DB related codes
const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017';
var db;
MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('zeenatdb')

});

module.exports = Router