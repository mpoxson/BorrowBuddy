import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/LoginStyles.css'; 

const Login = () => {
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
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const user = await authenticateUser(values.user_email, values.user_password);
      console.log('Login successful:', user);
      if (user) {
        navigate('/home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
    }
    setSubmitting(false);
  };
  

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <Formik
        initialValues={{
          user_email: '',
          user_password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="user_email">Email:</label>
              <Field type="email" name="user_email" />
              <ErrorMessage name="user_email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_password">Password:</label>
              <Field type="password" name="user_password" />
              <ErrorMessage name="user_password" component="div" className="error-message" />
            </div>
            {error && <div className="error-message">{error}</div>}
            
            <div className="create-account-link">
              <span>No account? <Link to="/register">Create one</Link></span>
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Log in
            </button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
