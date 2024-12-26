import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
   
    //the user object here act like a foreign key, which helps to access the notes of the loginned user
     user:{
        type: mongoose.Schema.ObjectId,
        ref:'user'
     },
     title: {
        type: String,
        required: true,
     },
     description:{
        type: String,
        required: true,
     },
     tag: {
        type: String,
        default:"General"
     },
     date: {
        type: Date,
        default: Date.now
     }
});

export default mongoose.model('notes', NotesSchema)

