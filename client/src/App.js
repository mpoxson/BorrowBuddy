//import './App.css';
import TestUsersList from "./components/TestUsersList";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/UsersList" element={<TestUsersList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* define some other routes here...*/}
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
