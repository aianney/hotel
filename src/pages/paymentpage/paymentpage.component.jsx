import React from 'react'
import PaymentStepper from '../../components/payment-method/payment-stepper/payment-stepper.component'
import PaymentContent from '../../components/payment-method/payment-content/payment-content.component'
import './paymentpage.styles.css'

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <PaymentStepper />
      <PaymentContent />
    </div>
  )
}

export default PaymentPage
