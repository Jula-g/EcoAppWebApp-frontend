import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Select Products', 'Enter Details', 'Confirm'];

interface CustomizedSteppersProps {
  activeStep: number;
}

const CustomizedSteppers: React.FC<CustomizedSteppersProps> = ({
  activeStep,
}) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomizedSteppers;
