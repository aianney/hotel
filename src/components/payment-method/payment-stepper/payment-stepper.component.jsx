import React from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import './payment-stepper.styles.css'

const PaymentStepper = () => {
  return (
    <div className="steptwo">
      <Stepper nonLinear activeStep={2} style={{ iconColor: '#febbc8' }}>
        <Step>
          <StepLabel>Selecting Rooms</StepLabel>
        </Step>
        <Step>
          <StepLabel>Guest Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
    </div>
  )
}

export default PaymentStepper
