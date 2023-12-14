const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./server/routes/user')
const postRoutes = require('./server/routes/post')
const likeRoutes = require('./server/routes/like')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// serve static file
app.use(express.static(path.join(__dirname, 'public')));

//CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res. header ("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/likes', likeRoutes)

app.get('/', (req, res) => {
    const userIdCookie = req.cookies.userId;

    if (userIdCookie) {
        return res.redirect('/feed');
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login', (req, res) => {
    const userIdCookie = req.cookies.userId;

    if (userIdCookie) {
        return res.redirect('/feed');
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/register', (req, res) => {
    const userIdCookie = req.cookies.userId;

    if (userIdCookie) {
        return res.redirect('/feed');
    }
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});
app.get('/feed', (req, res) => {
    const userIdCookie = req.cookies.userId;

    if (!userIdCookie) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public', 'feed.html'));
});

app.get('/logout', (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('FirstName');
    res.clearCookie('Username');
    
    res.redirect('/login');
});
// app.use for routes above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen (PORT, () => console.log(`Server started on PORT ${PORT}!!!`))