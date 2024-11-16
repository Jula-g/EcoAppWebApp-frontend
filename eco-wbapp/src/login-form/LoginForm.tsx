import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (values: any) => {
      console.log('Form data', values);
      navigate('/');
    },
    [navigate]
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup
          .string()
          .required('Password is required')
          .min(3, 'Password too short'),
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
                  id="signinform"
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
                    color="primary"
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
                    <a href="/signup" style={{ color: 'black' }}>
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
