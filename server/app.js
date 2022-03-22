//Node.js is an open-source and cross-platform runtime used when executing JavaScript code on the server-side. One of the popular Node.js server frameworks is Express.
// The most common use for Node. js is writing Web applications, and a large percentage of these web applications today are using Express. js as their server framework.

//**********sequence of work*********
// requires
// middlewares
// routes

//Express can be used to create JSON APIs, Server-side rendered web applications, or Microservices.
//Whenever you import a module like const express = require('express') express is a module with functions or objects or variables assigned to it 
const express = require('express');

//Body-parser is the Node. js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
//The bodyParser object exposes various factories to create middlewares.
//All middlewares will populate the req.body property with the parsed body when the Content-Type request header matches the type option, or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
var bodyParser = require('body-parser')

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
var cookieParser = require('cookie-parser')

//When the client makes a login request to the server, the server will create a session and store it on the server-side. When the server responds to the client, it sends a cookie. This cookie will contain the session’s unique id stored on the server, which will now be stored on the client. This cookie will be sent on every request to the server.
//We use this session ID and look up the session saved in the database or the session store to maintain a one-to-one match between a session and a cookie
var session = require('express-session')

//Implementing CORS in Node.js helps you access numerous functionalities on the browser.
//CORS stands for Cross-Origin Resource Sharing . It allows us to relax the security applied to an API.
//This is done by bypassing the Access-Control-Allow-Origin headers, which specify which origins can access the API.
var cors = require('cors');

//use is a way to register middleware or chain of middlewares (or multiple middlewares) before executing any end route logic or intermediary route logic depending upon order of middleware registration sequence.
//Middleware: forms chain of functions/middleware-functions with 3 parameters req, res, and next.
//Before heading to actual code, i want to put few words about express-session module. to use this module, you must have to include express in your project
const app = express();

//Express allows you to configure and manage an HTTP server to access resources from the same domain.
//The three parts that form an origin are protocal, domain, and port.
const corsOpts = {
    origin: 'http://localhost:4200',
    credentials: true,
    methods: [
        'GET',
        'POST',
        'PUT',
    ]
};
//Calling use(cors()) will enable the express server to respond to preflight requests.
//A preflight request is basically an OPTION request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
app.use(cors(corsOpts));

// middlewares // app use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.

app.use(session({
    name: 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));
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
    const category = req.session.category

    if (!category) {
        return res.send({
            status: "OK",
            error: "Category not there"
        })
    }
    next()

}
var loginRoutes = require('./Routes/UserAuthenticationServices')
var regsiterRoutes = require('./Routes/UserAuthenticationServices')
var forgetRoutes = require('./Routes/UserAuthenticationServices')
var notesService = require('./Routes/NotesServices');
var remainderService = require('./Routes/NotesServices');
app.use(notesService)
app.use(loginRoutes)
app.use(regsiterRoutes)
app.use(forgetRoutes)
app.use(remainderService)





app.listen(3001, (req, res) => {
    console.log('Express API is running at port 3001');
})