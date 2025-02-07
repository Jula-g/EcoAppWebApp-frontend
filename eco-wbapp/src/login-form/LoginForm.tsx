import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import { useApi } from '../apiContext';

function LoginForm() {
  const navigate = useNavigate();

  const apiClient = useApi();

  // let onSubmit = useCallback(
  //   (values: { username: string; password: string }, formik: any) => {
  //     apiClient.login(values).then((response) => {
  //       if (response.success) {
  //         navigate('/home-page');
  //       } else {
  //         formik.setFieldError('username', 'Invalid username or password');
  //       }
  //     });
  //   },
  //   [apiClient, navigate]
  // );

  const onSubmit = useCallback(
    async (values: { username: string; password: string }, formik: any) => {
      try {
        const success = await apiClient.login(values.username, values.password); // Call login
        if (success) {
          console.log('Login successful!');
          navigate('/'); // Redirect to home page after successful login
        } else {
          formik.setFieldError('username', 'Invalid username or password');
        }
      } catch (error: any) {
        console.error('Login failed:', error);
        alert(
          error?.response?.data?.message ||
            'An error occurred. Please try again.'
        );
      }
    },
    [apiClient, navigate]
  );

  // Form validation schema
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(3, 'Password must be at least 3 characters'),
  });

  const navigateToHomePage = () => {
    navigate('/');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '1200px',
          }}
        >
          <Typography
            sx={{
              fontSize: '38px',
              color: 'black',
              paddingLeft: '55px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
            onClick={navigateToHomePage}
          >
            ECCOGANG
          </Typography>
          <Divider
            sx={{ marginTop: '20px', marginBottom: '20px', width: '100%' }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '38px', color: 'black', marginTop: '20px' }}
            >
              Login
            </Typography>
            <Divider sx={{ width: '300px', marginBottom: '20px' }} />
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
            >
              {(formik) => (
                <form
                  id="loginForm"
                  onSubmit={formik.handleSubmit}
                  noValidate
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <TextField
                    id="username"
                    label="Username"
                    variant="filled"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && !!formik.errors.username}
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    sx={{ width: '300px' }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="filled"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ width: '300px' }}
                  />

                  <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={!(formik.isValid && formik.dirty)}
                    sx={{ width: '300px' }}
                  >
                    Log In
                  </Button>
                  <Divider sx={{ width: '300px', marginBottom: '20px' }} />
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: 'black',
                      marginBottom: '20px',
                    }}
                  >
                    Don't have an account?{' '}
                    <a href="/register" style={{ color: 'black' }}>
                      Sign up
                    </a>
                  </Typography>
                </form>
              )}
            </Formik>
            <Divider sx={{ width: '100%', marginBottom: '20px' }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginForm;
