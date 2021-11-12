import React from 'react'
import axios from 'axios'
import PaymentCheckout from '../payment-checkout/payment-checkout.component'

function App() {
  // console.log({ price, title })
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
      <PaymentCheckout />
    </form>
  )
}

export default App
