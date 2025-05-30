import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Student document
interface IStudent extends Document {
  name: string;
  email: string;
  course: string;
  phone:number;
  createdAt: Date;
  isDeleted:Boolean;
}

// Define the Student schema
const studentSchema: Schema = new Schema<IStudent>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  course: {
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone:{
    type: Number,
    required:true
  },
  isDeleted:{
   type:Boolean,
    default:false
  },
});

// Create and export the Student model
const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;