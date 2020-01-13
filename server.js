const express= require('express');
const listEndPoints= require('express-list-endpoints');
const path = require('path');
// The path module provides utilities for working with file and directory paths
const mongoose = require('mongoose');
const studentsRouter = require('./src/services/students')


const server = express();
server.use(express.json());
const port = 3001;


const local = "mongodb://localhost:27017/studentProjects"
mongoose.connect(
                 local,
                 {useNewUrlParser:true, //  to check whether your app successfully connects
                 useUnifiedTopology: true} //To opt in to using the new topology engine
                 ).then(db => console.log("MongoDB Connected"),
err => console.log("ERROR connecting to MongoDb", err))
    
server.use('students', studentsRouter);

console.log(listEndPoints(server));
server.listen(port,() => {
console.log(`server is running on port ${port}`);
});


