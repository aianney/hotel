import React, { useContext } from 'react'
import { AppContext, GuestDetailsForm, PageStepper } from '../../components'
import { Box } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const GuestDetails = () => {

  const { info: { filters } } = useContext(AppContext),
    history = useHistory();

  return (
    <>
      {
        !filters.reservationDates.end || !filters.reservationDates.start ?
          history.push("/") :
          <>
            <Box my={4}>
              <PageStepper activeStep={1} />
            </Box>
            <GuestDetailsForm />
          </>
      }
    </>
  )
}

export default GuestDetails
