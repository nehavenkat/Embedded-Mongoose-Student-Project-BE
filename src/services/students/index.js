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

router.get('/:id', async (req,res) => {
try {
//findById(id) is almost* equivalent to findOne({ _id: id }).
const students = await Student.findById(req.params.id)
res.send(students)
} catch (error) {
  res.status(404).send("Not found")
  }
});


router.post('/', async (req,res) => {
  try {
    const newStudent = new Student(req.body);
    const {_id} = await newStudent.save();
    res.send(newStudent);
//write comments
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req,res)=> {
 delete req.body._id
 
 const Students = await Student.findOneAndUpdate(
   {_id:req.params.id},//query: what we are looking for. In this case, the first element with the ASIN = req.params.asin
   {$set://$set: we want to change the object with the information that I'm passing. It's like the Object.assign(dbObject, newObject)
   {...req.body}////using the spread operator, we are selecting all the properties that we want to change
  })
  if (students)
  res.send(students)
  else
  res.status(404).send("Not found" + req.params._id)
});



router.delete('/:id', async (req,res) => {
  try {
//findByIdAndDelete(id) is a shorthand for findOneAndDelete({ _id: id })
const result = await Student.findOneAndDelete({_id: req.params._id})
res.send(result)
  } catch (error) {
    res.status(404).send("not found")
  }

});
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
