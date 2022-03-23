
const express = require('express')
const router = express.Router()
var ObjectId = require('mongodb').ObjectId;

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
    const notes = "notes"
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

//GET REMAINDER API
router.get("/remainder",checkLogin,(req, res) => {
    const username = req.session.username
    const remainder = "remainder"
    console.log(req.session.username);
    console.log(remainder);
    db.collection("notes").find({ "createdBy": username, "category":remainder }).toArray(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Remainder Successfully Please check remainder folder",
            data: result
        })

    })
})
//GET ARCHIVE API
router.get("/archive",checkLogin,(req, res) => {
    const username = req.session.username
    const  archive = "archive"
    console.log(req.session.username);
    console.log( archive);
    db.collection("notes").find({ "createdBy": username, "category": archive }).toArray(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Archive Successfully Please check archive folder",
            data: result
        })

    })
})

//GET BOOKMARK API
router.get("/bookmark",checkLogin,(req, res) => {
    const username = req.session.username
    const bookmark = "bookmark"
    console.log(req.session.username);
    console.log(bookmark);
    db.collection("notes").find({ "createdBy": username, "category":bookmark }).toArray(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Bookmark Successfully Please check bookmark folder",
            data: result
        })

    })
})

//GET TRASH API
router.delete("/trash",checkLogin,(req, res) => {
    const username = req.session.username
    const trash = "trash"
    console.log(req.session.username);
    console.log(trash);
    db.collection("notes").find({ "createdBy": username, "category":trash }).toArray(function (err, result) {
        if (err) {
            return res.send({
                status: "Error: some issue with db connection",
                data: err
            })

        };

        console.log(result);
        res.send({
            status: "Delete Successfully Please check Trash folder",
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
    db.collection("notes").insertOne({ "title": title, "text": text, "createdBy": username, "category":"notes" }).then(data => {
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
router.get("/remainder/:id", (req, res) => {
    const username = req.session.username;
    const notesId  = new ObjectId(req.params.id);

    var myquery = { _id: notesId };
    var newvalues = { $set: { category: "remainder", createdBy:username } };
    db.collection("notes").updateOne(myquery, newvalues, function (err, data) {
        if (err) console.log(err);
        console.log("1 document updated");
        res.send(data);
    });

})

//BOOKMARK API
router.get("/bookmark/:id", (req, res) => {
    const username = req.session.username;
    const notesId  = new ObjectId(req.params.id);

    var myquery = { _id: notesId };
    var newvalues = { $set: { category: "bookmark", createdBy:username } };
    db.collection("notes").updateOne(myquery, newvalues, function (err, data) {
        if (err) console.log(err);
        console.log("1 document updated");
        res.send(data);
    });

})

//ARCHIVE API
router.get("/archive/:id", (req, res) => {
    const username = req.session.username;
    const notesId  = new ObjectId(req.params.id);

    var myquery = { _id: notesId };
    var newvalues = { $set: { category: "archive", createdBy: username } };
    db.collection("notes").updateOne(myquery, newvalues, function (err, data) {
        if (err) console.log(err);
        console.log("1 document updated");
        res.send(data);
    });

})

//TRASH API
router.delete("/trash/:id", (req, res) => {
    const username = req.session.username;
    const notesId  = new ObjectId(req.params.id);

    var myquery = { _id: notesId };
    var newvalues = { $set: { category: "trash", createdBy: username } };
    db.collection("notes").deleteOne(myquery, newvalues, function (err, data) {
        if (err) console.log(err);
        console.log("1 document updated");
        res.send(data);
    });

})


module.exports = router