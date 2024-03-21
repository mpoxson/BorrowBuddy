import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { COLORS as c } from "./constants/enums";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TestUsersList from "./components/TestUsersList";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: c.PRIMARY,
    },
    secondary: {
      main: c.SECONDARY,
    },
    accent: {
      main: c.ACCENT,
    },
  },
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const redirectTo=null;//NOTE: INITIALIZE SHOULD BE NULL

  useEffect(() => {
    // Check if user is already authenticated in localStorage
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []); // Only run once on component mount

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true)); //The purpose of localStorage is to keep it true when login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); //false when logout
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <header className="App-header">
            <Routes>
              {/* Login AND Register are public page*/}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />

              {/* These routes are protected page, add more below... */}
              <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} redirectTo={redirectTo}/>}>
                <Route path="/home" element={<Home />} />
                <Route path="/usersList" element={<TestUsersList />} />
                <Route path="/" element={<Home />} />
              </Route>

            </Routes>
          </header>
        </Router>
      </ThemeProvider>
    </div>
  );
}
