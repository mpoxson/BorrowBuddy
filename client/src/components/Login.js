import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import '../css/LoginStyles.css';

// const Login = () => {
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const validationSchema = Yup.object().shape({
//     user_email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     user_password: Yup.string()
//       .required('Password is required')
//       .min(6, 'Password must be at least 6 characters'),
//   });
//   const authenticateUser = async (email, password) => {
//     try {
//       const response = await axios.get('http://localhost:3001/users');
//       const users = response.data;
//       const user = users.find(user => user.user_email === email);
//       console.log(users);
//       if (user) {
//         if (user.user_password === password) {
//           return user;
//         } else {
//           throw new Error('Invalid email or password');
//         }
//       } else {
//         throw new Error('User not found');
//       }
//     } catch (error) {
//       console.error('Authentication failed:', error.message);
//       return null;
//     }
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const user = await authenticateUser(values.user_email, values.user_password);
//       console.log('Login successful:', user);
//       if (user) {
//         navigate('/home');
//       } else {
//         setError('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Login failed:', error.message);
//       setError(error.message);
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div className="login-container">
//       <h1 className="login-title">Login</h1>
//       <Formik
//         initialValues={{
//           user_email: '',
//           user_password: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="form-group">
//               <label htmlFor="user_email">Email:</label>
//               <Field type="email" name="user_email" />
//               <ErrorMessage name="user_email" component="div" className="error-message" />
//             </div>
//             <div className="form-group">
//               <label htmlFor="user_password">Password:</label>
//               <Field type="password" name="user_password" />
//               <ErrorMessage name="user_password" component="div" className="error-message" />
//             </div>
//             {error && <div className="error-message">{error}</div>}

//             <div className="create-account-link">
//               <span>No account? <Link to="/register">Create one</Link></span>
//             </div>

//             <button type="submit" disabled={isSubmitting} className="submit-button">
//               Log in
//             </button>

//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default Login;

//To do
//Visual Response for failure to sign in
//Make sure sign in works

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link  from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { COLORS as c,  PAGE_ROUTES } from "../constants/enums";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BorrowBuddy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Login() {

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    user_password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const authenticateUser = async (email, password) => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;
      const user = users.find(user => user.user_email === email);
      console.log(users);
      if (user) {
        if (user.user_password === password) {
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Authentication failed:', error.message);
      return null;
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      const user = await authenticateUser(data.get("email"), data.get("password"));
      console.log('Login successful:', user);
      if (user) {
        navigate(PAGE_ROUTES.HOME);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
    }

  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: c.PRIMARY, color:c.ACCENT }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              validationSchema={validationSchema}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={PAGE_ROUTES.REGISTER} variant="body2" color={c.ACCENT}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    
  );
}
