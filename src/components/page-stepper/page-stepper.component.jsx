import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '..'
import { Stepper, Step, StepLabel } from '@material-ui/core'

const PageStepper = (props) => {
  const { info, setInfo } = useContext(AppContext)
  console.log(setInfo)
  return (
    <Stepper nonLinear activeStep={props.activeStep}>
      <Step>
        <NavLink to="/room-selection">
          <StepLabel>Selecting Rooms</StepLabel>
        </NavLink>
      </Step>
      <Step>
        {Object.keys(info.guestDetails).length ? (
          <NavLink to="/guest-details">
            <StepLabel>Guest Details</StepLabel>
          </NavLink>
        ) : (
          <StepLabel>Guest Details</StepLabel>
        )}
      </Step>
      <Step>
        {Object.keys(info.payment).length ? (
          <NavLink to="/payments">
            <StepLabel>Payment</StepLabel>
          </NavLink>
        ) : (
          <StepLabel>Payment</StepLabel>
        )}
      </Step>
    </Stepper>
  )
}

export default PageStepper
