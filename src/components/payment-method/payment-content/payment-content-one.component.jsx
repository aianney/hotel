import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import PaymentContentOne from '../payment-content-one/payment-content-one.component'
import './payment-content.styles.css'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function PaymentContent() {
  return (
    <div className="payment">
      <h1>Payment Method</h1>
      <p>
        Choose from the following mode of payments to complete your reservation
      </p>
      {/* details */}
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item className="item">
              <span>Reservation ID:</span>
              <span>DMDG - 10261028</span>
            </Item>
            <Item className="item">
              <span>Rooms Reserved:</span>
              <span>4</span>
            </Item>
            <Item className="item">
              <span>Reserved Dates:</span>
              <span>Oct. 26, 2021 - Oct. 28, 2021</span>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="item">
              <span>Name:</span>
              <span>Diane M. De Guzman</span>
            </Item>
            <Item className="item">
              <span>Email:</span>
              <span>yanney@gmail.com</span>
            </Item>
            <Item className="item">
              <span>Mobile No.:</span>
              <span>09263880835</span>
            </Item>
            <Item className="item">
              <span>Address:</span>
              <span>Porac IIB Fiesta Communities</span>
            </Item>
          </Grid>
        </Grid>
        <PaymentContentOne />
        <button className="btn-payment">Finish</button>
      </Box>
    </div>
  )
}
