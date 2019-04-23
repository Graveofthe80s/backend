const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors);

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    console.log("Ok");
});

mongoose.connect('mongodb+srv://ferreira80s:ferreira80s@omnistack-ferreira-wuspd.mongodb.net/omnistack-ferreira?retryWrites=true', 
    {
        useNewUrlParser: true
    }
);

//Middlewares
app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);