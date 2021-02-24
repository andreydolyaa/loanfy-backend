const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./config/data.js');
const emailService = require('./services/email.service');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}



const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/users/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.post('/subscribe', (req, res) => {
    console.log('REQ BODY EMAIL :',req.body);
    // console.log('CONFIG :',config.emailUN);
    // console.log('CONFIG :',config.emailPW);
    emailService.sendEmail(req.body);
    res.end();
})


const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log('Server started on port *', port);
});

