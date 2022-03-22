
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

function checkLogin(req, res, next) {
    const username = req.session.username

    if (!username) {
        return res.send({
            status: "UAUTHORIZE",
            error: "User not login"
        })
    }
    next()

}
function checkCategory(req, res, next) {
    const category = req.category

    if (category) {
        return res.send({
            status: "200",
            category: "Category are here"
        })
    }else{
        return res.send({
            status: "404",
            error: "Category not found"
        })
    }
    next()

}

//Now using ‘request‘ variable you can assign session to any variable
router.get('/getData',checkLogin, (req, res) => {
    console.log(req.session.username)
    res.json({
        "statusCode": 200,
        "statusMessage": "SUCCESS",
        "session": req.session.username
    })
})



//GET NOTES API
router.get("/notes",checkLogin,(req, res) => {
    const username = req.session.username
    const notes = req.session.category
    console.log(req.session.username);
    db.collection("notes").find({ "createdBy": username, "category":notes }).toArray(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Success",
            data: result
        })

    })
})

//ADD NOTES API
router.post('/notes', (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const username = req.session.username
    console.log(req.session, "Notes session")
    console.log(req.body);
    if (!req.body.text || req.body.text == "") {
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message": "Notes is not available"
        })
    }
    db.collection("notes").insertOne({ "title": title, "text": text, "createdBy": username }).then(data => {
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

//REMAINDER API



router.put("/remainder",(req, res) => {
    const username = req.session.username
    console.log(req.session.username);
    const category_id = { noteid:parseInt(req.params.noteid)}
    db.collection("remainder").updateOne({category_id},{"createdBy": username},{category:"remainder"})(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Remainder Notes Successfully saved",
            data: result
        })

    })
})


module.exports = router