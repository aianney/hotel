import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  Divider,
  Fade,
  Grid,
  IconButton,
  Slide,
  Typography,
} from '@material-ui/core'
import { Theme, AppContext } from '..'
import moment from 'moment'
import { BsDashCircleFill } from 'react-icons/bs'

const PriceBreakdown = (props) => {
  const { info } = useContext(AppContext),
    history = useHistory(),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays()

  useEffect(() => {
    if (info.roomSelection.rooms && !info.roomSelection.rooms.length) {
      props.setPriceBreakdownOpen(false)
    }
    // eslint-disable-next-line
  }, [info])

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          zIndex: 1200,
        }}
      >
        {/* Backdrop START */}
        <Fade in={props.priceBreakdownOpen}>
          <Box
            onClick={() => {
              props.setPriceBreakdownOpen(false)
              props.setProceed(false)
            }}
            sx={{
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,.75)',
              bottom: 0,
              height: '100vh',
              left: 0,
              width: '100vw',
              position: 'fixed',
            }}
          ></Box>
        </Fade>
        {/* Backdrop END */}

        {/* Filter Card START */}
        <Slide direction="up" in={props.priceBreakdownOpen}>
          <Card
            sx={{
              maxHeight: '100vh',
              overflowY: 'scroll',
              backgroundColor: Theme.palette.background.light,
              width: {
                xs: '100%',
                sm: '50vw',
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
              },
              left: {
                xs: 0,
                sm: props.proceed ? 'auto' : 30,
              },
              right: {
                xs: 0,
                sm: props.proceed ? 30 : 'auto',
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomLeftRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomRightRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
            }}
          >
            <Box p={4}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="filterLabel">
                    Price Breakdown (Staying for {dateDifference} day
                    {dateDifference !== 1 ? 's' : ''})
                  </Typography>
                </Grid>
                {info.reservationInformation &&
                info.reservationInformation.room ? (
                  info.reservationInformation.room.map((room) =>
                    info.roomSelection.rooms.filter((e) =>
                      e.id.includes(room.roomType),
                    ).length ? (
                      <>
                        <Grid item xs={5} sx={{ ...alignCenter }}>
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
                                                (addOn) =>
                                                  addOn.count * addOn.price,
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
                        <Grid item xs={1} ml={-3}>
                          <IconButton
                            color="error"
                            sx={{ width: 'auto' }}
                            onClick={() =>
                              props.setRooms(
                                props.rooms
                                  .map((e) =>
                                    !e.id.includes(room.roomType) ? e : null,
                                  )
                                  .filter((n) => n),
                              )
                            }
                          >
                            <BsDashCircleFill />
                          </IconButton>
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
                                            (x.price +
                                              (x.addOns.length
                                                ? x.addOns
                                                    .map(
                                                      (addOn) =>
                                                        addOn.price *
                                                        addOn.count,
                                                    )
                                                    .reduce((a, b) => a + b)
                                                : 0)) *
                                            info.filters.currencyRate
                                          ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}`}
                                        </Typography>
                                      </Box>
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
                                          {`${info.filters.currency} ${(
                                            x.price * info.filters.currencyRate
                                          ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}`}
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
                mt={6}
                mb={-3}
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
                        info.roomSelection.totalPayment *
                        info.filters.currencyRate
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : 0}
                </Typography>
              </Grid>
            </Box>

            <Box mb={2} mx={2} sx={{ ...alignCenter, justifyContent: 'end' }}>
              <Button
                variant="text"
                onClick={() => {
                  props.setPriceBreakdownOpen(false)
                }}
              >
                <Box
                  px={2}
                  py={1}
                  sx={{
                    fontWeight: Theme.typography.fontWeightBold,
                    textDecoration: 'none',
                    color: 'unset',
                  }}
                >
                  Add More Rooms
                </Box>
              </Button>
              {/* Action Buttons START */}
              <Button
                variant="contained"
                sx={{
                  display: props.proceed ? 'flex' : 'none',
                  justifyContent: 'flex-end',
                  borderRadius: Theme.shape.borderRadius,
                }}
                onClick={() => {
                  history.push('/guest-details')
                }}
                disabled={
                  info.roomSelection.rooms && info.roomSelection.rooms.length
                    ? false
                    : true
                }
              >
                <Box
                  px={2}
                  py={1}
                  sx={{
                    fontWeight: Theme.typography.fontWeightBold,
                    textDecoration: 'none',
                    color: 'unset',
                  }}
                >
                  Proceed
                </Box>
              </Button>
              {/* Action Buttons END */}
            </Box>
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default PriceBreakdown
