import React from 'react'
import Button from '@mui/material/Button'
import PaymentIcon from '@mui/icons-material/Payment'
import Stack from '@mui/material/Stack'
import { Box } from '@material-ui/core'
import TermsAndConditions from '../../modals/termsandconditions/termsandconditions.component'
//import Checkbox from '../radio-payment/radio-payment.component'

export default function PaymentCheckout() {
  return (
    <>
      <Box p={2}>
        {/* <Checkbox /> */}
        <TermsAndConditions />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="outlined" startIcon={<PaymentIcon />}>
            CHECK OUT
          </Button>
        </Stack>
      </Box>
    </>
  )
}
