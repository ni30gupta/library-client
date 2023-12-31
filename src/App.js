import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Library from './components/Library';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Navbar from './components/Navbar.js';
import { ManageLibrary } from './components/ManageLibrary.js';
import MyAccount from './components/MyAccount.js';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manage" element={<ManageLibrary />} />
            <Route path="/account" element={<MyAccount />} />
            {/* <Route path="/logout" element={<MyAccount />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
