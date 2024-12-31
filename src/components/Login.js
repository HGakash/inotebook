import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
 const navigate = useNavigate();

const [cred, setCred] = useState({email:'',password:''})

const handleChange = (e) => {
    setCred({...cred,[e.target.name]: e.target.value});
}

const handleSubmit = async (e) =>{
e.preventDefault();
try {
  const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //sending the payload to backend which is obtained from the user
        body:JSON.stringify(cred)
       });
      const json = await response.json();
      console.log(cred);
      console.log(json);
    if(json.success){
        // Save the auth token and redirect
        localStorage.setItem('token',json.authToken);
        await props.showAlert("login successful","success");
        navigate('/');
    
    }else{
        props.showAlert("invalid credentials","danger");
        // alert('invalid credentials');
    }
} catch (error) {
    console.error("something error occured",error);
    alert("error occured")
  }
}
  return (
    <div>   
      <h2>Login to continue with iNotebook</h2>
     <form onSubmit={handleSubmit} className='my-3'>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={handleChange} placeholder="Enter email" required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={handleChange} placeholder="Password" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary my-3" >Submit</button>
</form>
    </div>
  )
}

export default Login
