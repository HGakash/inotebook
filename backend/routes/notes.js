import express from 'express'
import Notes from '../models/Notes.js'
const router = express.Router();
import { body,validationResult } from 'express-validator';
import fetchUser  from '../middleware/fetchUser.js';

                                              //ROUTE HANDLERS
//ROUTE 1
// after /api/notes if /fetchallnotes is there the root will hit this end point
router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try {
        //fetch all the notes of id and the id is decoded from the fetchuser middleware 
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

//ROUTE 2
// Get All notes using: Get "api/notes/addnote" . Login required
router.post('/addnote',fetchUser,[
   body('title','enter a valid title').isLength({min:3}),
   body('description','description must be atleast 5 charecters').isLength({min:5}),
   body('tag','tag must be atleast 2 charecters').isLength({min:2})
],
   async (req,res)=>{
   try {
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
       if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()});
       }

    //here we also store the id as user which is associated with the token which is decoded using fetchUser middleware
    const note = new Notes({
         title,
         description,
         tag,
         user:req.user.id
    })

    //both .create() .save() create documents in the collection but .save() allows modification to the existing document, means .save() creates the new instance of the model
     const saveNote = await note.save();

    res.json(saveNote);
    
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
   }
}
)

//ROUTE 3: 
//update an existing Note using : POST '/api/notes/updatenote' . Login note 
router.put('/updatenote/:id',fetchUser, async(req,res) => {
    const {title,description,tag} = req.body;

    try {
        //create a newNote object
    const newNote = {};

    if(title){newNote.title=title};
    if(description){newNote.description=description}
    if(title){newNote.tag=tag}

    //find the note to be updated and update it 
    let note = await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("Not Found");
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("note allowed")
    }
    
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 4:
//update an existing Note using : POST '/api/notes/updatenote' . Login note 

router.delete('/deletenote/:id',fetchUser,async(req,res)=>{

    try {
        //find note to be deleted
      let note = await Notes.findById(req.params.id);
    // first see if the note is exist or not 
      if(!note){
          return res.status(401).send("Not Found")
      }
   // Allow deletion only if user owns this Note
      if(req.user.id !== note.user.toString()){
          return res.status(401).send("Not Allowed")
      }
    note = await Notes.findByIdAndDelete(req.params.id)
  
    res.send({"Sucess":"Note has been delted",note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
   
})

export default router



