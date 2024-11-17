import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Formik } from 'formik';
import { useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';

function RegisterForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values: any) => {
      console.log('Registration data', values);
      navigate('/');
    },
    [navigate]
  );

  const navigateToHomePage = () => {
    navigate('/');
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
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
        dateOfBirth: yup
          .date()
          .required('Date of Birth is required')
          .typeError('Invalid date format'),
        termsAccepted: yup
          .boolean()
          .oneOf([true], 'You must accept the terms and conditions'),
      }),
    []
  );

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
            }}
            onClick={navigateToHomePage}
            style={{ cursor: 'pointer' }}
          >
            EcoApp
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
              sx={{
                fontSize: '38px',
                color: 'black',
                marginTop: '20px',
              }}
            >
              Register
            </Typography>
            <Divider sx={{ width: '300px', marginBottom: '20px' }} />
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                dateOfBirth: '',
                termsAccepted: false,
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
            >
              {(formik) => (
                <form
                  id="registerform"
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
                    id="email"
                    label="Email"
                    variant="filled"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
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
                  <TextField
                    id="confirmPassword"
                    label="Repeat Password"
                    variant="filled"
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
                    sx={{ width: '300px' }}
                  />
                  <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    variant="filled"
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
                    sx={{ width: '300px' }}
                  />
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
                  <Typography variant="caption" sx={{ width: '300px' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent malesuada quam vel nibh facilisis, et vulputate
                    nisl tempor.
                  </Typography>

                  <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={!(formik.isValid && formik.dirty)}
                    sx={{ width: '300px' }}
                  >
                    Register
                  </Button>
                  <Divider sx={{ width: '300px', marginBottom: '20px' }} />
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: 'black',
                      marginBottom: '20px',
                    }}
                  >
                    Already have an account?{' '}
                    <a href="/login" style={{ color: 'black' }}>
                      Log in
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

export default RegisterForm;
