import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import './payment-content.styles.css'
import PaymentPriceBreakDown from '../payment-price-breakdown/payment-price-breakdown.component'
import CustomButton from '../../custom-button/custom-button.component'
import { Typography } from '@material-ui/core'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#f9f9f9;',
}))

export default function PaymentContent() {
  return (
    <div className="payment">
      <Typography variant="pageTitle">Payments</Typography>
      {/* details */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="pageSubtitle">
          Choose from the following mode of payments to complete your
          reservation
        </Typography>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item className="item">
              <span className="item_span_one">Reservation ID:</span>
              <span>DMDG - 10261028</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Rooms Reserved:</span>
              <span>4</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Reserved Dates:</span>
              <span>Oct. 26, 2021 - Oct. 28, 2021</span>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="item">
              <span className="item_span_one">Name:</span>
              <span>Diane M. De Guzman</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Email:</span>
              <span>yanney@gmail.com</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Mobile No.:</span>
              <span>09263880835</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Address:</span>
              <span>Porac IIB Fiesta Communities</span>
            </Item>
          </Grid>
        </Grid>
        <PaymentPriceBreakDown />
        {/* <TermsAndCondition /> */}
        {/* <PaymentContentOne /> */}
        <CustomButton className="payment-button">Finish</CustomButton>
      </Box>
    </div>
  )
}
