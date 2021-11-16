import React from 'react'
import axios from 'axios'
import CustomButton from '../../custom-button/custom-button.component'
//import PaymentIcon from '@mui/icons-material/Payment'
import './paymentbutton.styles.css'

function PaymentButton() {
  // console.log({ price, title })
  // const [checked, setChecked] = React.useState(false)
  // const handleChange = (event) => {
  //   setChecked(event.target.checked)
  // }
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)

    e.preventDefault()

    // requests checkout url
    try {
      const { data } = await axios.post('http://localhost:5000/payment', {
        price: 44,
        title: 'ROOM 101',
      })

      setLoading(false)

      /// redirects window location to stripe checkout url
      window.location.href = data.url
    } catch (error) {
      setLoading(false)
      console.log({ error })
    }

    // console.log({ p })
  }
  return (
    <form onSubmit={handleSubmit}>
      {loading && <p>loading payment...</p>}
      <CustomButton
        type="submit"
        variant="outlined"
        // startIcon={<PaymentIcon />}
      >
        Pay Now
      </CustomButton>
    </form>
  )
}

export default PaymentButton
