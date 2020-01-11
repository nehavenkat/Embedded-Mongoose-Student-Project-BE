const mongoose = require("mongoose");
//Everything in Mongoose starts with a Schema.
// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

const ProjectsSchema = new mongoose.Schema({
name: String,
description: String,
url: String
})

const StudentsSchema = new mongoose.Schema ({
name: String ,
surname: String,
email: String,
projects: [ProjectsSchema] //projectSchema is embedded into studentsSchema

})

module.exports = mongoose.model('student',StudentsSchema);
//when you have a module that exports just the one thing, it’s more common to use "module.exports"
//compiling our schema into a Model.