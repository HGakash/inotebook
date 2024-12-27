import './App.css';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';

function App() {
  return (
    <>
  {/* the state variables under the NoteState will be available to the components which come under NoteState  */}
    <NoteState>
      <Router>
        <Navbar/>
        <Alert message="This is amazing inotebook"/>
      <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
