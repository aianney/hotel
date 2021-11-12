import React from 'react'
import axios from 'axios'
import { Box, Stack, Button } from '@material-ui/core'
import PaymentIcon from '@mui/icons-material/Payment'
import TermsAndConditions from '../../modals/termsandconditions/termsandconditions.component'

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
      <Box p={2}>
        <TermsAndConditions />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" startIcon={<PaymentIcon />}>
            CHECK OUT
          </Button>
        </Stack>
      </Box>
    </form>
  )
}

export default App
