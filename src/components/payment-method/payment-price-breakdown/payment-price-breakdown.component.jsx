import React from 'react'
import RadioButtons from '../radio-payment/radio-payment.component'
import { IoCardSharp } from 'react-icons/io5'
import { BsPaypal } from 'react-icons/bs'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import './payment-price-breakdown.styles.css'
import TermsAndCondition from '../../modals/terms-and-conditions/terms-and-conditions.component'

const PaymentPriceBreakDown = () => {
  return (
    <div className="grid">
      <div className="column_one" style={{ backgroundColor: 'white' }}>
        <div className="item">
          <h3>Standard Room</h3>
          <h3>₱ 21,000.00</h3>
        </div>
        <ul>
          <li>Room 1 - 2A/1C</li>
          <li>
            ₱ 11,500.00
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <ul>
          <li>Room 1 - 2A/0C</li>
          <li>
            ₱ 11,500.00{' '}
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <div className="item">
          <h3>Standard Room</h3>
          <h3>₱ 21,000.00</h3>
        </div>
        <ul>
          <li>Room 1 - 2A/1C</li>
          <li>
            ₱ 11,500.00
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <ul>
          <li>Room 1 - 2A/0C</li>
          <li>
            ₱ 11,500.00
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <div className="item">
          <h3>Standard Room</h3>
          <h3>₱ 21,000.00</h3>
        </div>
        <ul>
          <li>Room 1 - 2A/1C</li>
          <li>
            ₱ 11,500.00
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <ul>
          <li>Room 1 - 2A/0C</li>
          <li>
            ₱ 11,500.00
            <TiDelete className="column_one_icons" size={30} color="red" />
          </li>
        </ul>
        <div className="item">
          <h3>Total Price</h3>
          <h3>₱ 21,000.00</h3>
        </div>
      </div>
      {/* Column 2 */}
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
  )
}

export default PaymentPriceBreakDown
