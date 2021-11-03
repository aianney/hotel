import React, { Component } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core'

class PageStepper extends Component {
  render() {
    return (
      <Stepper nonLinear activeStep={this.props.activeStep} >
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
    );
  }
}

export default PageStepper
