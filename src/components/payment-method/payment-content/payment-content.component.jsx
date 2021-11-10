import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import './payment-content.styles.css'
import PaymentPrice from '../../payment-method/paymentprice/paymentprice.component'
//import PaymentPriceBreakDown from '../payment-price-breakdown/payment-price-breakdown.component'
import CustomButton from '../../custom-button/custom-button.component'
import { AppContext } from '../..'
import PaymentMethod from '../payment-price-breakdown/paymentmethod'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#f9f9f9;',
}))

export default function PaymentContent({ location }) {
  const { info } = useContext(AppContext)

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
              <span className="item_span_one">Name:</span>
              <span>{`${info.guestDetails.firstName} ${info.guestDetails.lastName}`}</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Email:</span>
              <span>{info.guestDetails.email}</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Phone No:</span>
              <span>{info.guestDetails.number}</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Reserved Dates:</span>
              <span>Oct. 26, 2021 - Oct. 28, 2021</span>
            </Item>
          </Grid>
          {/* <Grid item xs={6}>
            <Item className="item">
              <span className="item_span_one">Name:</span>
              <span>{`${info.guestDetails.firstName} ${info.guestDetails.lastName}`}</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Email:</span>
              <span>{info.guestDetails.email}</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Mobile No.:</span>
              <span>09263880835</span>
            </Item>
            <Item className="item">
              <span className="item_span_one">Address:</span>
              <span>Porac IIB Fiesta Communities</span>
            </Item>
          </Grid> */}
        </Grid>
        <PaymentPrice />
        <PaymentMethod />

        {/* <PaymentPriceBreakDown /> */}
        <CustomButton className="payment-button">Finish</CustomButton>
      </Box>
    </div>
  )
}
