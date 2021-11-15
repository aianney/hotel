import React from 'react'
import axios from 'axios'
import {
  Box,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'
import PaymentIcon from '@mui/icons-material/Payment'
import TermsAndConditions from '../../modals/termsandconditions/termsandconditions.component'
import './paymentbutton.styles.css'

function App() {
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
      <Box p={2}>
        <FormControlLabel
          control={<Checkbox />}
          label={<TermsAndConditions />}
        />
        {/* <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" startIcon={<PaymentIcon />}>
            Pay using Credit Card
          </Button>
        </Stack> */}
        <FormControlLabel control={<Checkbox />} label="Over the Counter" />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" startIcon={<PaymentIcon />}>
            Pay using Credit Card
          </Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" startIcon={<PaymentIcon />}>
            Pay using Credit Card
          </Button>
        </Stack>
      </Box>
    </form>
  )
}

export default App
