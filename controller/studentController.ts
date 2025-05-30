import { Request, Response } from 'express';
import Student from '../models/studentSchema';

 const renderTable=async(req:Request,res:Response):Promise<void>=>
{
    try {
        let studentData=await Student.find({isDeleted:false})
        res.render('table',{
            studentData,
        })
    } catch (error) {
        res.send("error")
    }
}
const newStudent=async(req:Request,res:Response):Promise<void>=>
{
    try {
        console.log(req.body);
        
          const {name,email,phone,course}=req.body;
    let isPresent = await Student.findOne({
  $or: [
    { email: email },
    { phone: phone }
  ]
});

if (isPresent) {
  // Email or phone already exists
 res.status(400).json({ message: 'Email or phone already exists' });
 return;
}
let newStudent=new Student({name,email,phone,course})
newStudent.save()
  .then((savedStudent) => {
    res.status(201).json({
      message: 'Student saved successfully!',
      student: savedStudent
    });
  })
  .catch((err) => {
    console.error('Error saving student:', err);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  });
    } catch (error) {
        console.log(error);     
    }
}

const editStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, email, course, phone } = req.body;
console.log(req.body);

    const studentData = await Student.findById(id);
    if (!studentData) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const isDuplicatePhone = await Student.findOne({
      _id: { $ne: id }, 
      $or: [ { phone: phone }]
    });
 const isDuplicateEmail=await Student.findOne({
      _id: { $ne: id }, 
      $or: [ { email:email}]
    });

    if (isDuplicatePhone) {
      res.status(400).json({ message: "phone number already exists" });
      return;
    }
    
    if (isDuplicateEmail) {
      res.status(400).json({ message: "email already already exists" });
      return;
    }

    studentData.name = name;
    studentData.email = email;
    studentData.phone = phone;
    studentData.course = course;

    await studentData.save();

    res.status(200).json({ message: "Student updated successfully" });
    return;

  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default{
    renderTable,
    newStudent,
    editStudent
}