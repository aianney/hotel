import React from 'react'
//import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
//import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import PaymentContent from '../payment-content/payment-content.component'

export default function PaymentCard() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
      <Grid item xs={6}>
        <PaymentContent />
      </Grid>
      {/* </Grid> */}
    </Box>
  )
}
