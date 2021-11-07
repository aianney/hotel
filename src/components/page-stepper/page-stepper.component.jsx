import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '..'
import { Stepper, Step, StepLabel } from '@material-ui/core'

const PageStepper = (props) => {
  const { info, setInfo } = useContext(AppContext)
  console.log(setInfo)
  return (
    <Stepper nonLinear activeStep={props.activeStep}>
      <Step>
        <Link to="/room-selection">
          <StepLabel>Selecting Rooms</StepLabel>
        </Link>
      </Step>
      <Step>
        {Object.keys(info.guestDetails).length ? (
          <Link to="/guest-details">
            <StepLabel>Guest Details</StepLabel>
          </Link>
        ) : (
          <StepLabel>Guest Details</StepLabel>
        )}
      </Step>
      <Step>
        {Object.keys(info.payment).length ? (
          <Link to="/payments">
            <StepLabel>Payment</StepLabel>
          </Link>
        ) : (
          <StepLabel>Payment</StepLabel>
        )}
      </Step>
    </Stepper>
  )
}

export default PageStepper
