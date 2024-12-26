import jwt from 'jsonwebtoken';
const JWT_SECRET = 'akashisgoodboy';
const fetchUser = (req,res,next) => {
    //Get the user from the jwt token and add id to request object
    const token = req.header('auth-token');

    //if token is not there in the header server will say "get out"
    if(!token){
        res.status(401).send({error: "please authenticate using a valid token"});
    }

try {
    /* const data = {
      user:{
         id:user.id
      }
    } jwt.verify will return the payload means the above data which was used for signing*/
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user
    
} catch (error) {
    res.status(401).send({error:"please authenticate using a valid token"})
}
next();
}


export default fetchUser