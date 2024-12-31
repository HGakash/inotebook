import express from 'express'
const router = express.Router();
import User from '../models/User.js'
import { body,validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchUser from '../middleware/fetchUser.js';

const JWT_SECRET = 'akashisgoodboy';
                         //ROUTE HANDLERS OF AUTHENTICATION ROUTES
//Route 1
// after /api/auth/createuser end point is there in the url is there the root will use this root handler
//Create a usetr using: POST "api/auth/createUser". does not require auth  No login required
router.post('/createuser',[
   body('name','enter a valid name').isLength({min:2}),
   body('email','enter a valid email').isEmail(),
   body('password','password must be atleast 5 charecters').isLength({min:5})
],async (req,res)=>{
   //if there are errors, return bad request and the error 
   let success = false;
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }
   
  // check wherther the user with this email exist already
  try {
   let user = await User.findOne({email: req.body.email});
   if(user){
       return res.status(400).json({error: "Sorry a user with this email already exist"})
   } 

   //encrypting the password using bcrypt.js and generating 10 rounds salt to add more complexity
   const salt = await bcrypt.genSalt(10);
   let secPass = await bcrypt.hash(req.body.password, salt)
   //create a new user
    user = await User.create({
       name: req.body.name,
       email:req.body.email,
       password: secPass
    })  
    
    const data = {
      user:{
         id:user.id
      }
    }
    success=true;
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({success,authToken});
   
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

})
//Route 2
//authenticate a user using: "/api/auth/login"  No login required
router.post('/login',[
   body('email','enter a valid email').isEmail(),
   body('password','password cannot be blank').exists()
],async (req,res) =>{
   let success = false
   //if there errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
   }
  const {email,password} = req.body
  try {
   //finding whether the user with the entered email exist or not 
   let user = await User.findOne({email});
   if(!user){
      success = false
    return  res.json({msg:"please try to login with correct credential"}).status(400)
   }
   //if exist then 
   //comparing the password entered by the user against the password fetched from the database for the particular entered email
   const passwordCompare = await bcrypt.compare(password, user.password);
   if(!passwordCompare){
    success = false
    return  res.json({success,msg:"please try to login with correct credential"}).status(400)
   }

   const payload = {
      user:{
         id: user.id
      }
   }
   //preparing auth token for loggined user
   const authToken = jwt.sign(payload,JWT_SECRET); 
   success = true
   res.json({success,authToken})
  
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal server error");
  }
}

)



// .then(user => res.json(user))
   // .catch(err=>{console.log(err)
   //    res.json({error:'please enter a unique email value',msg:err.message})
   // })


//Route 3: Get logged in user details using POST "/api/auth/getUser" loggin required
//here we first need to decode userId from the provided auth-token in the header then fetching the user details from the decoded ID
//we need to authenticate the 
router.post('/getuser',fetchUser,async (req,res) =>{
try {
   let userId = req.user.id
   const user = await User.findById(userId).select("-password")
   res.send(user);
} catch (error) {
   console.error(error.message);
   res.status(500).send("Internal server error");
}
}
);
export default router
