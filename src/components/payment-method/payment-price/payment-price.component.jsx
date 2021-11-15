import React, { useContext } from 'react'
import { Box, Divider, Grid, Typography } from '@material-ui/core'
import Theme from '../../theme/theme.component'
import AppContext from '../../app-context/app-context.component'
import PaymentOptions from '../../payment-method/payment-options/payment-options.component'

const PriceBreakdown = (props) => {
  const { info } = useContext(AppContext),
    alignCenter = { display: 'flex', alignItems: 'center' }

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          {info.reservationInformation && info.reservationInformation.room ? (
            info.reservationInformation.room.map((room) =>
              info.roomSelection.rooms.filter((e) =>
                e.id.includes(room.roomType),
              ).length ? (
                <>
                  <Grid item xs={6} sx={{ ...alignCenter }}>
                    <Typography
                      variant="priceBreakdownTitle"
                      sx={{ fontWeight: Theme.typography.bold }}
                    >
                      {room.roomAttributes.roomName}
                    </Typography>
                    {/* <Grid item xs={6} sx={{ display: 'flex' }}>
                      <Typography
                        variant="introSubtitle"
                        sx={{ fontSize: '18px' }}
                      >
                        Room -{' '}
                        {`${info.filters.guests.adults}A / ${info.filters.guests.children}C`}
                      </Typography>
                    </Grid> */}
                  </Grid>
                  <Grid item xs={1} sx={{ ...alignCenter }}>
                    <Typography>
                      x
                      {info.roomSelection.rooms
                        ? info.roomSelection.rooms.filter((e) =>
                            e.id.includes(room.roomType),
                          ).length
                        : 0}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    sx={{ ...alignCenter, justifyContent: 'flex-end' }}
                  >
                    <Typography variant="priceBreakdownTitlePrice">
                      {info.filters.currency && info.filters.currencyRate
                        ? `${info.filters.currency} ${(
                            info.roomSelection.rooms
                              .filter((e) => e.id.includes(room.roomType))
                              .map(
                                (e) =>
                                  e.price +
                                  (e.addOns
                                    ? e.addOns
                                        .map(
                                          (addOn) => addOn.count * addOn.price,
                                        )
                                        .reduce((a, b) => a + b)
                                    : 0),
                              )
                              .reduce((a, b) => a + b, 0) *
                            info.filters.currencyRate
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : 0}
                    </Typography>
                  </Grid>
                  <Divider />
                </>
              ) : (
                <> </>
              ),
            )
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          mt={3}
          sx={{ ...alignCenter, justifyContent: 'flex-end' }}
        >
          <Typography
            variant="priceBreakdownTitle"
            sx={{ fontWeight: Theme.typography.bold }}
          >
            {`Total:`}
          </Typography>
          <Typography variant="priceBreakdownTitle">
            {info.filters.currency && info.filters.currencyRate
              ? `${info.filters.currency} ${(
                  info.roomSelection.totalPayment * info.filters.currencyRate
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : 0}
          </Typography>
        </Grid>
        <PaymentOptions />
      </Box>
    </>
  )
}

export default PriceBreakdown
