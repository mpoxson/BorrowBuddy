import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { COLORS as c } from "./constants/enums";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageTest from "./components/ImageTest";
import TestUsersList from "./components/UserAccountInfo";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import PrivateRoutes from "./utils/PrivateRoutes";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { COLORS } from "./constants/enums";
import { PAGE_NAMES } from "./constants/enums";
import Grid from "@mui/material/Unstable_Grid2";
import ProductEachDetail from "./components/ProductEachDetail";
import butterflyGif from "./image/butterfly_Gif.gif";
import Footers from "./components/Footer";
import Product from "./components/Product";
import Conversations from "./components/Conversations";
import Messages from "./components/Messages";
import AddProduct from "./components/AddProduct";
import UserDetails from "./components/UserDetails";
import NoMatch from "./components/NoMatch";

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
  const redirectTo = null; //NOTE: INITIALIZE SHOULD BE NULL
  const [disableLoginButton, setDisableLoginButton] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated in localStorage
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Only run once on component mount

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true)); //The purpose of localStorage is to keep it true when login
    setDisableLoginButton(true); // Disable login button after successful login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); //false when logout
    setDisableLoginButton(false); // Enable login button after logout
    setUser(null);
    return <img src={butterflyGif} alt="Beautiful Butterfly" />;
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            isLoggedIn={isAuthenticated}
            disableLoginButton={disableLoginButton}
            user={user}
          />
          <Router>
            <header className="App-header">
              <Routes>
                {/* Login AND Register are public page*/}
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route path="/register" element={<Register />} />
                {/* <Route
                  path="/"
                  element={
                    isAuthenticated ? <Home /> : <Login onLogin={handleLogin} /> 
                  }
                /> */}

                {/* These routes are protected page, add more below... */}
                <Route
                  element={
                    <PrivateRoutes
                      isAuthenticated={isAuthenticated}
                      redirectTo={redirectTo}
                    />
                  }
                >
                  <Route path="/home" element={<Home />} />
                  <Route path="/usersList" element={<TestUsersList />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="/products/:productId" element={<Product />} />
                  <Route path="/imageTest" element={<ImageTest />} />
                  <Route path="/AddProduct" element={<AddProduct />} />
                  <Route path="/Conversations" element={<Conversations />} />
                  <Route
                    path="/Messages/:conversationID"
                    element={<Messages />}
                  />
                  <Route path="/users/:userId" element={<UserDetails />} />
                  <Route path="*" element={<NoMatch />} />
                </Route>
              </Routes>
            </header>
          </Router>
          <CssBaseline />

          {/* Render butterfly image if not authenticated and not login/Register page */}

          {!isAuthenticated &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/register" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "75vh",
                }}
              >
                <Link href="http://localhost:3000/login">
                  <img
                    src={butterflyGif}
                    alt="Beautiful Butterfly GIF"
                    style={{
                      transform: "rotate(-45deg)",
                      width: "260px",
                      height: "260px",
                    }}
                  />
                </Link>
              </div>
            )}

          <Footers />
        </Box>
      </ThemeProvider>
    </div>
  );
}
