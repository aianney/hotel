import React from 'react'
import { BsPaypal } from 'react-icons/bs'
import { FaMoneyBill } from 'react-icons/fa'
import { BiCreditCard } from 'react-icons/bi'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core'
import Theme from '../../theme/theme.component'
import { TermsAndCondition } from '../..'

export default function SwitchListSecondary() {
  const [dense, setDense] = React.useState(false)
  const [dense1, setDense1] = React.useState(false)
  const [dense2, setDense2] = React.useState(false)
  const [dense3, setDense3] = React.useState(false)

  return (
    <>
      <Box p={1} sx={{ width: '100%' }} mt={4} ml={-1}>
        <Typography
          variant="priceBreakdownTitle"
          sx={{ fontWeight: Theme.typography.bold }}
        >
          Choose payment Options
        </Typography>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemIcon>
              <BiCreditCard size={30} color="#71c7b8" />
            </ListItemIcon>
            <ListItemText id="switch-list-label-wifi" primary="Credit Card" />

            <Checkbox
              checked={dense}
              onChange={(event) => setDense(event.target.checked)}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BsPaypal size={30} color="#71c7b8" />
            </ListItemIcon>
            <ListItemText id="switch-list-label-bluetooth" primary="Paypal" />
            <Checkbox
              checked={dense1}
              onChange={(event) => setDense1(event.target.checked)}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FaMoneyBill size={30} color="#71c7b8" />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary="Over The Counter"
            />
            <Checkbox
              checked={dense3}
              onChange={(event) => setDense3(event.target.checked)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              id="switch-list-label-bluetooth"
              primary={<TermsAndCondition />}
            />
            <Checkbox
              checked={dense2}
              onChange={(event) => setDense2(event.target.checked)}
            />
          </ListItem>
        </List>
      </Box>
    </>
  )
}
