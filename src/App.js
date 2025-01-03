import './App.css';
import React, { useState } from 'react';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  return (
    <>
  {/* the state variables under the NoteState will be available to the components which come under NoteState  */}
    <NoteState>
      <Router>
        <Navbar/>
        <Alert alert={alert}/>
      <div className='container'>
      <Routes>
         {/* here we pass the showalert function as prop to the components when those componets changes the state of the alert the alert will re-render and displays */}
        <Route path="/" element={<Home  showAlert={showAlert}/>} />
        <Route path="/about" element={<About  />} />
        <Route path="/login" element={<Login showAlert={showAlert} />} />
        <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
