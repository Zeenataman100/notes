const Router= require('express');
const express = require('express')
const router = express.Router()

// DB related codes
const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017';
var db;
MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('zeenatdb')

});

//middleware that is specific router
//LOGIN API
router.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    if (!req.body.name || req.body.name == "") {
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": "Data is not available"
        })
    }
    db.collection("employees").find({ "name": name, "password": password }).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));

        if (result.length) {
            req.session.username = name;
            res.cookie('username', name)  //set cookiee
            console.log(req.session, "current session")
            res.send({
                status: "Success",
                data: "User is authenticated, Login success "
            })
            // return res.redirect('/notes');
        }
        else {
            res.send({
                status: "Error",
                data: "not a valid user"
            })
        }

    });
})


//REGISTER API
router.post('/register', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body);
    if (!req.body.name || req.body.name == "") {
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": "Data is not available"
        })
    }
    db.collection("employees").insertOne({ "name": name, "password": password, "email": email }).then(data => {
        console.log(data);
        if (data.acknowledged) {
            res.send({
                "statusCode": 200,
                "statusMessage": "SUCCESS",
                "message": "Data saved successfully."
            })
        } else {
            res.send({
                "statusCode": 200,
                "statusMessage": "ERROR",
                "message": "Some issue with Data"
            })
        }

    }).catch(err => {
        res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": err
        })
    })

})

//FORGET API
router.post('/forgot', (req, res) => {
    const forgot = req.body.forgot;
    console.log(req.body);
    if (!req.body.forgot || req.body.forgot == "") {
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": "Email is not available"
        })
    }
    db.collection("forgetpassword").insertOne({ "email": forgot }).then(data => {
        console.log(data);
        if (data.acknowledged) {
            res.send({
                "statusCode": 200,
                "statusMessage": "SUCCESS",
                "message": "Data saved successfully."
            })
        } else {
            res.send({
                "statusCode": 200,
                "statusMessage": "ERROR",
                "message": "Some issue with Data"
            })
        }

    }).catch(err => {
        res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": err
        })
    })

})

module.exports = Router;