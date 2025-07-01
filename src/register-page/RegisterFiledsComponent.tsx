import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography, Grid, Paper } from '@mui/material';
import { useApi } from '../apiContext';

function RegisterForm() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response = await apiClient.register({
          username: values.username,
          password: values.password,
          email: values.email,
          name: values.name,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        });

        if (
          response.status === 201 ||
          (response.data as any).statusCode === 201
        ) {
          alert('Registration successful!');
          navigate('/');
        } else {
          alert('Unexpected response from the server');
        }
      } catch (error: any) {
        console.error('Registration failed:', error);
        alert(
          error?.response?.data?.message ||
            'Registration failed. Please try again.'
        );
      }
    },
    [apiClient, navigate]
  );

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
    name: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    dateOfBirth: yup
      .date()
      .required('Date of Birth is required')
      .typeError('Invalid date'),
    termsAccepted: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions'),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '80%',
          padding: '40px',
          borderRadius: '16px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Typography
          sx={{
            fontSize: '32px',
            color: '#333333',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
            fontFamily: 'Comfortaa',
          }}
        >
          Register for ECCOGANG
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            lastName: '',
            phoneNumber: '',
            dateOfBirth: '',
            termsAccepted: false,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid container spacing={4}>
                {/* Left Column: Form Fields */}
                <Grid item xs={12} md={6}>
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && !!formik.errors.username}
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber && !!formik.errors.phoneNumber
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                  <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    name="dateOfBirth"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.dateOfBirth && !!formik.errors.dateOfBirth
                    }
                    helperText={
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    }
                    sx={{ marginBottom: '16px' }}
                  />
                </Grid>

                {/* Right Column: Terms and Submit */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ padding: '20px' }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        color: '#555555',
                        marginBottom: '20px',
                        lineHeight: '1.6',
                      }}
                    >
                      By registering, you agree to our terms and conditions.
                      Please make sure you read them carefully before
                      proceeding.
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="termsAccepted"
                          name="termsAccepted"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.termsAccepted}
                        />
                      }
                      label="I accept the terms and conditions"
                    />
                    {formik.touched.termsAccepted &&
                      !!formik.errors.termsAccepted && (
                        <Typography color="error" variant="caption">
                          {formik.errors.termsAccepted}
                        </Typography>
                      )}
                    <Button
                      color="success"
                      type="submit"
                      variant="contained"
                      disabled={!(formik.isValid && formik.dirty)}
                      sx={{ width: '300px' }}
                    >
                      Register
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
