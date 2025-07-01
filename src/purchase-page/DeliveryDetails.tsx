import React, { useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

interface DeliveryDetailsProps {
  deliveryOption: string;
  setDeliveryOption: React.Dispatch<React.SetStateAction<string>>;
  userData: { name: string; address: string; email: string };
  setUserData: React.Dispatch<
    React.SetStateAction<{ name: string; address: string; email: string }>
  >;
  onConfirm: () => void;
  onBack: () => void;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  deliveryOption,
  setDeliveryOption,
  userData,
  setUserData,
  onConfirm,
  onBack,
}) => {
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required('Name is required'),
        address: yup.string().required('Address is required'),
        email: yup
          .string()
          .email('Invalid email address')
          .required('Email is required'),
        deliveryOption: yup
          .string()
          .required('Please select a delivery option'),
      }),
    []
  );

  const handleSubmit = useCallback(
    (values: any) => {
      setUserData({
        name: values.name,
        address: values.address,
        email: values.email,
      });
      setDeliveryOption(values.deliveryOption);
      onConfirm();
    },
    [setUserData, setDeliveryOption, onConfirm]
  );

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '600px',
          padding: '20px',
        }}
      >
        <Typography
          sx={{
            fontSize: '38px',
            color: 'black',
            marginBottom: '20px',
          }}
        >
          Delivery Details
        </Typography>
        <Divider sx={{ marginBottom: '20px' }} />
        <Formik
          initialValues={{
            name: userData.name,
            address: userData.address,
            email: userData.email,
            deliveryOption: deliveryOption,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          enableReinitialize
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              {/* Left Column: User Information */}
              <Box sx={{ flex: 1, paddingRight: '50px' }}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  User Information
                </Typography>
                <TextField
                  id="name"
                  label="Name"
                  variant="filled"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="address"
                  label="Address"
                  variant="filled"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={formik.touched.address && formik.errors.address}
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <TextField
                  id="email"
                  label="Email"
                  variant="filled"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  sx={{ marginBottom: '15px' }}
                />
                <Button
                  onClick={onBack}
                  sx={{
                    marginTop: '20px',
                    display: 'block',
                    width: '80px',
                    backgroundColor: 'black',
                    color: 'white',
                    marginBottom: '20px',
                  }}
                >
                  Back
                </Button>
              </Box>

              {/* Right Column: Delivery Options */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: '20px',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  Delivery Options
                </Typography>
                <RadioGroup
                  name="deliveryOption"
                  value={formik.values.deliveryOption}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard Delivery ($5.00)"
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label="Express Delivery ($10.00)"
                  />
                  <FormControlLabel
                    value="self-pickup"
                    control={<Radio />}
                    label="Self-Pickup ($0.00)"
                  />
                </RadioGroup>
                <Typography
                  sx={{ color: 'red', fontSize: '12px', marginTop: '8px' }}
                >
                  {formik.touched.deliveryOption &&
                    formik.errors.deliveryOption}
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!(formik.isValid || formik.dirty)}
                  sx={{
                    width: '100%',
                    marginTop: '80px',
                    backgroundColor: 'black',
                    color: 'white',
                    ':disabled': { backgroundColor: 'gray' },
                    height: 'fit-content',
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default DeliveryDetails;
