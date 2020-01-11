const express = require('express');
const listEndPoints= require('express-list-endpoints');
const path = require('path');
// The path module provides utilities for working with file and directory paths
const mongoose = require('mongoose');
const studentsRouter = require('./src/services/students')


const server = express();
server.use('students', studentsRouter);
console.log(listEndPoints(server));
mongoose.connect("mongodb://localhost:27017/studentProjects",{
    useNewUrlParser:true, //  to check whether your app successfully connects
    useUnifiedTopology: true //To opt in to using the new topology engine
}).then(
    server.listen(port,() => {
        console.log('server is running on port ${port}');
    })
).catch(err => console.log(err));

