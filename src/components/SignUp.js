import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {

const navigate =  useNavigate()

const [user, setUser] = useState({name:'',email:'',password:''});

const handleChange = (e) =>{
   setUser({...user,[e.target.name]:e.target.value});
}

const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser' , {
       method:'POST',
       headers:{
        'Content-Type':'application/json'
       },
       body:JSON.stringify(user),
    } 
)
const json =  await response.json()
console.log(json);
if(json.success){
    props.showAlert("Your account created successfully","primary")
    localStorage.setItem('token',json.authToken);
    navigate('/')
  }else{
    props.showAlert("invalid creds","danger");
  }
}


return (
    <div>
      <h2>Create an account to use iNotebook</h2>
 <form onSubmit={handleSubmit}>
 <div className="form-group my-2">
    <label htmlFor="exampleInputName">Name</label>
    <input type="name" className="form-control" id="name" name='name'  onChange={handleChange}  placeholder="Enter Name" minLength={2} required/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange}  placeholder="Enter email" required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group my-2">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={handleChange}  placeholder="Password" minLength={5}  required/>
  </div>
  <button type="submit" className="btn btn-primary my-3" >SignUp</button>
</form>
    </div>
  )
}

export default SignUp
