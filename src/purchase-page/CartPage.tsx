import React, { useState } from 'react';
import { Box } from '@mui/material';
import PurchaseNavBar from './PurchaseNavBar';
import CustomizedSteppers from './CustomizedSteppers';
import ProductSelection from './ProductSelection';
import DeliveryDetails from './DeliveryDetails';
import Confirmation from './Confirmation';
import products from '../products';

export default function PurchaseListComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [purchases, setPurchases] = useState(products);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    email: '',
  });

  const totalAmount = purchases.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  return (
    <Box
      sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}
    >
      <PurchaseNavBar />
      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          padding: '20px',
          maxWidth: '85%',
          margin: '70px auto 0',
          borderRadius: '28px',
        }}
      >
        <CustomizedSteppers activeStep={currentStep} />

        <Box
          sx={{
            backgroundColor: 'white',
            marginTop: '40px',
            padding: '20px',
            borderRadius: '28px',
          }}
        >
          {currentStep === 0 && (
            <ProductSelection
              purchases={purchases}
              setPurchases={setPurchases}
              totalAmount={totalAmount}
              onNext={handleNext}
            />
          )}
          {currentStep === 1 && (
            <DeliveryDetails
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              userData={userData}
              setUserData={setUserData}
              onConfirm={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <Confirmation
              userData={userData}
              deliveryOption={deliveryOption}
              totalAmount={totalAmount}
              onBack={handleBack}
              onConfirm={handleNext}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
