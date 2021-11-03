import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import './payment-content-one.styles.css'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function PaymentContentOne() {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item className="item">
              <span>Standard Rooms</span>
              <span>₱12,000.00</span>
            </Item>

            <div className="sub-items">
              <Item className="item">
                <span>Room 1 - 2A/1C</span>
                <span>₱11,500.00</span>
              </Item>
              <Item className="item">
                <span>Room 1A/0C</span>
                <span>₱11,500.00</span>
              </Item>
            </div>

            <Item className="item">
              <span>Superior Sea View</span>
              <span>₱23,0000.00</span>
            </Item>
            <div className="sub-items">
              <Item className="item">
                <span>Room 1 - 2A/1C</span>
                <span>₱11,500.00</span>
              </Item>
              <Item className="item">
                <span>Room 1A/0C</span>
                <span>₱11,500.00</span>
              </Item>
            </div>

            <Item className="item">
              <span>Environmental Fee</span>
              <span>₱400.00</span>
            </Item>
            <div className="sub-items">
              <Item className="item">
                <span>Room 1 - 2A/1C</span>
                <span>₱11,500.00</span>
              </Item>
              <Item className="item">
                <span>Room 1A/0C</span>
                <span>₱11,500.00</span>
              </Item>
            </div>

            <Item className="item">
              <span>Total</span>
              <span>₱44,000.00</span>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item className="item">
              <span>Credit Card</span>
              {/* <span>Diane M. De Guzman</span> */}
            </Item>
            <Item className="item">
              <span>Paypal</span>
              {/* <span>yanney@gmail.com</span> */}
            </Item>
            <Item className="item">
              <span>Over the Counter</span>
              {/* <span>09263880835</span> */}
            </Item>
            <Item className="item">
              <span>I agree to the Hotel's Guidelines</span>
              {/* <span>Porac IIB Fiesta Communities</span> */}
            </Item>

            <Item className="item">
              <span>I agree to the Terms and Conditions</span>
              {/* <span>Porac IIB Fiesta Communities</span> */}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
