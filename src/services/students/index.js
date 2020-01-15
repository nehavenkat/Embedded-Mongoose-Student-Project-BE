const express = require('express');
const router = express.Router();
const Student = require('./schema');

router.get('/', async (req,res)=> {
try {
  const students = await Student.find({})
  res.send(students)
} catch (error) {
  res.send(error);
}  
});

router.get('/:id', async (req,res) => {});

router.post('/', async (req,res) => {
  try {
    const newStudent = new Student(req.body);
    const {_id} = await newStudent.save();
    res.send(_id);
//write comments
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req,res)=> {});

router.delete('/:id', async (req,res) => {});
//retriving the singlestudent with specificID and projects of that specific student 
router.get('/:id/projects', async (req,res) => {
try{
//req.params.id => will be accessed when a parameter(ID) is passed while performing a HTTP GET. 
//So if we access application as /id, we will get the informatuon as the same.
const student =await Student.findById(req.params.id)
res.send(student.projects);
}catch(error){
    res.send(error);
}
});
// return specific project for specific student
router.get('/:id/projects/:projid', async (req,res) => {});
//add a project to a specific students project list
router.post('/:id/projects', async (req,res) => {
try {
  const newProject = req.body;// An object containing text parameters from the parsed request body, defaulting to {}
  const project = await Student.findByIdAndUpdate(req.params.id,
    {
    //The $push operator appends a specified value to an array.
    $push: {projects: newProject}
  });
res.send(project);
} catch (error) {
  res.send(error);  
}
});


module.exports = router;
