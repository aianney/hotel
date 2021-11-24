import React from 'react'
import { Grid } from '@material-ui/core'
//import AppContext from '../../app-context/app-context.component'
//import moment from 'moment'
import PaymentBreakdown from '../payment-breakdown/payment-breakdown.component'
import './payment-content.styles.css'

const Payment = (props) => {
  return (
    <Grid
      container
      sx={{
        mb: 10,
      }}
    >
      <Grid item xs={12}>
        <PaymentBreakdown />
      </Grid>
    </Grid>
  )
}

export default Payment
