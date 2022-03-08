const express = require('express');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')


// requires
// middlewares
// routes

const app = express();
var cors = require('cors');

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};

app.use(cors(corsOpts));
// app.use(cors(corsOptions))
app.options('*', cors())



// middlewares // app use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(session({
    secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// database connection
// DB related codes
const MongoClient = require('mongodb').MongoClient
const myurl = 'mongodb://localhost:27017';
var db;
MongoClient.connect(myurl, (err, client) => {
    if (err) return console.log(err)
    db = client.db('zeenatdb')

});

app.get('/getData', (req, res) => {
    console.log(req.session.username)
    res.json({
        "statusCode": 200,
        "statusMessage": "SUCCESS",
        "session":req.session
    })
})

//LOGIN API
app.post("/login", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    if(!req.body.name || req.body.name==""){
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":"Data is not available" 
        })
    }
    db.collection("employees").find({ "name": name, "password": password }).toArray(function (err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));

        if (result.length) {
            req.session.username = name;
            console.log(req.session,"current session")
            res.send({
                status: "Success",
                data: "User is authenticated, Login success "
            })
            // return res.redirect('/notes');
        }
        else{
            res.send({
                status: "Error",
                data: "not a valid user"
            })
        }
        
    });
})

//REGISTER API
app.post('/register', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body);
    if(!req.body.name || req.body.name==""){
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":"Data is not available" 
        })
    }
    db.collection("employees").insertOne({"name": name, "password": password,"email": email}).then(data=>{
      console.log(data);
        if(data.acknowledged){
            res.send({
                "statusCode": 200,
                "statusMessage": "SUCCESS",
                "message":"Data saved successfully." 
            })
        }else{
            res.send({
                "statusCode": 200,
                "statusMessage": "ERROR",
                "message":"Some issue with Data" 
            })
        }
        
    }).catch(err=>{
        res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":err 
        })
    })
    
})

//GET NOTES API
app.get("/notes", (req, res) => {

    db.collection("notes").find({ }).toArray(function (err, result) {
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
app.post('/notes', (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const username = req.session.username
    console.log(req.session,"Notes session")
    console.log(req.body);
    if(!req.body.text || req.body.text==""){
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":"Notes is not available" 
        })
    }
    db.collection("notes").insertOne({"title": title,"text": text, "createdBy": username}).then(data=>{
      console.log(data);
        if(data.acknowledged){
            res.send({
                "statusCode": 200,
                "statusMessage": "SUCCESS",
                "message":"Data saved successfully." 
            })
        }else{
            res.send({
                "statusCode": 200,
                "statusMessage": "ERROR",
                "message":"Some issue with Data" 
            })
        }
        
    }).catch(err=>{
        res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":err 
        })
    })
    
})

//FORGET API
app.post('/forgot', (req, res) => {
    const forgot = req.body.forgot;
    console.log(req.body);
    if(!req.body.forgot || req.body.forgot==""){
        return res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":"Email is not available" 
        })
    }
    db.collection("forgetpassword").insertOne({"email": forgot}).then(data=>{
      console.log(data);
        if(data.acknowledged){
            res.send({
                "statusCode": 200,
                "statusMessage": "SUCCESS",
                "message":"Data saved successfully." 
            })
        }else{
            res.send({
                "statusCode": 200,
                "statusMessage": "ERROR",
                "message":"Some issue with Data" 
            })
        }
        
    }).catch(err=>{
        res.send({
            "statusCode": 200,
            "statusMessage": "ERROR",
            "message":err 
        })
    })
    
})


app.listen(3001, (req, res) => {
    console.log('Express API is running at port 3001');
})
