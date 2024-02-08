import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/RegisterStyles.css'; 

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Name is required'),
    user_state: Yup.string().required('State is required'),
    user_city: Yup.string().required('City is required'),
    user_address: Yup.string().required('Address is required'),
    user_zipcode: Yup.number().required('Zipcode is required'),
    user_email: Yup.string().email('Invalid email address').required('Email is required'),
    user_phone: Yup.string().required('Phone number is required'),
    user_profile: Yup.string().required('Profile is required'),
    user_profile_picture: Yup.string().required('Profile picture is required'),
    user_password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post('http://localhost:3001/users', values);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <Formik
        initialValues={{
          user_name: '',
          user_state: '',
          user_city: '',
          user_address: '',
          user_zipcode: '',
          user_email: '',
          user_phone: '',
          user_profile: '',
          user_profile_picture: '',
          user_password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="user_name">Name:</label>
              <Field type="text" name="user_name" />
              <ErrorMessage name="user_name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_state">State:</label>
              <Field type="text" name="user_state" />
              <ErrorMessage name="user_state" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_city">City:</label>
              <Field type="text" name="user_city" />
              <ErrorMessage name="user_city" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_address">Address:</label>
              <Field type="text" name="user_address" />
              <ErrorMessage name="user_address" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_zipcode">Zipcode:</label>
              <Field type="text" name="user_zipcode" />
              <ErrorMessage name="user_zipcode" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_email">Email:</label>
              <Field type="email" name="user_email" />
              <ErrorMessage name="user_email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_phone">Phone:</label>
              <Field type="text" name="user_phone" />
              <ErrorMessage name="user_phone" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_profile">Profile:</label>
              <Field type="text" name="user_profile" />
              <ErrorMessage name="user_profile" component="div" className="error-message" />
            </div>
            {/* this profile_picture may need submit a image, we may need change the type*/}
            <div className="form-group">
              <label htmlFor="user_profile_picture">Profile Picture:</label>
              <Field type="text" name="user_profile_picture" />
              <ErrorMessage name="user_profile_picture" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="user_password">Password:</label>
              <Field type="password" name="user_password" />
              <ErrorMessage name="user_password" component="div" className="error-message" />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" disabled={isSubmitting} className="submit-button">
              Register
            </button>
            <div className="login-link">
              <span>Already have an account? <Link to="/login">Log in</Link></span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
