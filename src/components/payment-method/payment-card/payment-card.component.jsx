import React from 'react'
// import { Box, Card, Grid, Typography } from '@material-ui/core';
import RadioButtons from '../radio-payment/radio-payment.component'
import { IoCardSharp } from 'react-icons/io5'
import { BsPaypal } from 'react-icons/bs'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
//import { TiDelete } from 'react-icons/ti'
//import './payment-price-breakdown.styles.css'
import TermsAndCondition from '../../modals/terms&conditions/terms&conditions.component'
// import { Theme } from '../..'

const PaymentMethod = () => {
  return (
    <>
      <div className="grid">
        <div className="column_two" style={{ backgroundColor: 'white' }}>
          <div className="item_two">
            <h3>
              <IoCardSharp className="__icons" />
              Credit Card
            </h3>
            <p>
              <RadioButtons />
            </p>
          </div>
          <div className="item_two">
            <h3>
              <BsPaypal className="__icons" />
              Paypal
            </h3>
            <p>
              <RadioButtons />
            </p>
          </div>
          <div className="item_two">
            <h3>
              <FaRegMoneyBillAlt className="__icons" />
              Over the Counter
            </h3>
            <p>
              <RadioButtons />
            </p>
          </div>
          <div className="item_two">
            <h3 className="radio_buttons">
              <RadioButtons className="radio" />I agree to the
              <TermsAndCondition />
            </h3>
            {/* <p>Some text..</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethod
