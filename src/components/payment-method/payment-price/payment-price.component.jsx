import React, { useContext } from 'react'
import { Box, Grid } from '@mui/material'
import AppContext from '../../app-context/app-context.component'
//import Theme from '../../theme/theme.component'
//import { BsDashCircleFill } from 'react-icons/bs'
import moment from 'moment'
import PaymentButton from '../../payment-method/payment-button/payment-button.component'
import PaymentOptions from '../../payment-method/payment-options/payment-options.component'

const PriceBreakDownContent = (props) => {
  const { info, setInfo } = useContext(AppContext),
    // eslint-disable-next-line
    alignCenter = { display: 'flex', alignItems: 'center' },
    // eslint-disable-next-line
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays(),
    // eslint-disable-next-line
    removeRoomType = (roomType) => {
      let updates = info.roomSelection.rooms.length
        ? info.roomSelection.rooms
            .map((room) => (!room.id.includes(roomType) ? room : null))
            .filter((room) => room)
        : []

      setInfo({
        ...info,
        roomSelection: {
          ...info.roomSelection,
          rooms: updates,
        },
      })
    }

  return (
    <>
      <Box px={4}>
        <Grid item xs={12}>
          <Box mt={-1} mb={15}>
            <PaymentOptions />
          </Box>
          <PaymentButton />
        </Grid>
      </Box>
    </>
  )
}

export default PriceBreakDownContent
