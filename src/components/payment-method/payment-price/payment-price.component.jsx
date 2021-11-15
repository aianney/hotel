import React, { useContext } from 'react'
import { Box, Divider, Grid, Typography, IconButton } from '@material-ui/core'
import { TiDelete } from 'react-icons/ti'
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
                  <Grid item xs={12} mt={-2} mb={1}>
                    <Grid container spacing={1}>
                      {info.roomSelection.rooms
                        .filter((x) => x.id.includes(room.roomType))
                        .map((x, i) => (
                          <>
                            <Grid item xs={12}>
                              <Box
                                px={2}
                                sx={{
                                  ...alignCenter,
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Box>
                                  <Typography variant="priceBreakdownTitle">
                                    {`Room ${i + 1}`}
                                  </Typography>
                                </Box>
                                {/* <Box>
                                  <Typography
                                    variant="priceBreakdownTitle"
                                    sx={{
                                      fontStyle: 'italic',
                                      fontSize: 16,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {`${info.filters.currency} ${(
                                      (x.price +
                                        (x.addOns.length
                                          ? x.addOns
                                              .map(
                                                (addOn) =>
                                                  addOn.price * addOn.count,
                                              )
                                              .reduce((a, b) => a + b)
                                          : 0)) *
                                      info.filters.currencyRate
                                    ).toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}`}
                                  </Typography>
                                </Box> */}
                              </Box>
                            </Grid>

                            <Grid item xs={12}>
                              <Box
                                pl={3}
                                pr={2}
                                sx={{
                                  ...alignCenter,
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="priceBreakdownTitle"
                                    sx={{
                                      fontStyle: 'italic',
                                      fontSize: 16,
                                      fontWeight: 500,
                                    }}
                                  >
                                    {`${x.adults} Adult${
                                      x.adults === 1 ? '' : 's'
                                    } / ${x.children} Child${
                                      x.children === 1 ? '' : 'ren'
                                    }`}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography
                                    variant="priceBreakdownTitle"
                                    sx={{
                                      fontStyle: 'italic',
                                      fontSize: 16,
                                      fontWeight: 500,
                                    }}
                                  >
                                    <Grid
                                      item
                                      xs={6}
                                      sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                      }}
                                    >
                                      {/* <Button sx={{ fontSize: '13px' }} variant="contained" color="error">
              Remove
            </Button> */}
                                      <IconButton color="error">
                                        {' '}
                                        <TiDelete size={30} />
                                      </IconButton>
                                    </Grid>
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>

                            {x.addOns.length ? (
                              x.addOns.map((addOn, index) =>
                                addOn.count ? (
                                  <Grid item xs={12}>
                                    <Box
                                      pl={3}
                                      pr={2}
                                      sx={{
                                        ...alignCenter,
                                        justifyContent: 'space-between',
                                      }}
                                    >
                                      <Box sx={{ width: '70%' }}>
                                        <Typography
                                          variant="priceBreakdownTitle"
                                          sx={{
                                            fontStyle: 'italic',
                                            fontSize: 16,
                                            fontWeight: 500,
                                            wordWrap: 'break-word',
                                          }}
                                        >
                                          {`${addOn.count} - ${addOn.description}`}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          variant="priceBreakdownTitle"
                                          sx={{
                                            fontStyle: 'italic',
                                            fontSize: 16,
                                            fontWeight: 500,
                                          }}
                                        >
                                          {`${info.filters.currency} ${(
                                            addOn.price *
                                            addOn.count *
                                            info.filters.currencyRate
                                          ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}`}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Grid>
                                ) : (
                                  <></>
                                ),
                              )
                            ) : (
                              <> </>
                            )}
                          </>
                        ))}
                    </Grid>
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
          mt={2}
          mb={2}
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
