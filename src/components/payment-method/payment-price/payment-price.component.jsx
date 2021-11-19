import React, { useContext } from 'react'
import { Box, Divider, Grid, IconButton, Typography, Card } from '@mui/material'
import AppContext from '../../app-context/app-context.component'
import Theme from '../../theme/theme.component'
import { BsDashCircleFill } from 'react-icons/bs'
import moment from 'moment'
import PaymentButton from '../../payment-method/payment-button/payment-button.component'
import PaymentOptions from '../../payment-method/payment-options/payment-options.component'

const PriceBreakDownContent = (props) => {
  const { info, setInfo } = useContext(AppContext),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays(),
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
      {info.reservationInformation && info.reservationInformation.room ? (
        info.reservationInformation.room.map((room) =>
          info.roomSelection.rooms.filter((e) => e.id.includes(room.roomType))
            .length ? (
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ ...alignCenter, justifyContent: 'space-between' }}
              >
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{ fontWeight: Theme.typography.bold }}
                >
                  {room.roomAttributes.roomName}
                </Typography>
                <IconButton
                  color="error"
                  sx={{ width: 'auto' }}
                  onClick={() => removeRoomType(room.roomType)}
                >
                  <BsDashCircleFill />
                </IconButton>
              </Grid>
              <Grid item xs={12} mb={1}>
                <Grid container>
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
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{ fontSize: 16 }}
                              >
                                {`${room.roomType} ${i + 1}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        {/*Room Rate START */}
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
                                {x.rate}
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
                                {`${info.filters.currency}
                                                            ${(
                                                              x.price *
                                                              info.filters
                                                                .currencyRate *
                                                              dateDifference
                                                            ).toLocaleString(
                                                              undefined,
                                                              {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                              },
                                                            )}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        {/*Room Rate END */}

                        {/* Show AddOns Label START */}
                        {x.addOns.length &&
                        x.addOns
                          .map((addOn) => addOn.count)
                          .reduce((a, b) => a + b) ? (
                          <Grid item xs={12} sx={{ ...alignCenter }}>
                            <Box pl={3} pr={2} sx={{ width: '50%' }}>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{
                                  fontStyle: 'italic',
                                  fontSize: 14,
                                  fontWeight: 500,
                                  wordWrap: 'break-word',
                                }}
                              >
                                AddOns:
                              </Typography>
                            </Box>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {/* Show AddOns Label END */}

                        {/* AddOns START */}
                        {x.addOns.length ? (
                          x.addOns.map((addOn, index) =>
                            addOn.count ? (
                              <Grid item xs={12}>
                                <Box
                                  pl={4}
                                  pr={2}
                                  sx={{
                                    ...alignCenter,
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  <Box sx={{ width: '50%' }}>
                                    <Typography
                                      variant="priceBreakdownTitle"
                                      sx={{
                                        fontStyle: 'italic',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        wordWrap: 'break-word',
                                      }}
                                    >
                                      {`${
                                        addOn.count ? `(${addOn.count})` : ''
                                      } ${addOn.description}`}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography
                                      variant="priceBreakdownTitle"
                                      sx={{
                                        fontStyle: 'italic',
                                        fontSize: 14,
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${info.filters.currency} 
                                                                            ${(
                                                                              addOn.price *
                                                                              addOn.count *
                                                                              info
                                                                                .filters
                                                                                .currencyRate *
                                                                              dateDifference
                                                                            ).toLocaleString(
                                                                              undefined,
                                                                              {
                                                                                minimumFractionDigits: 2,
                                                                                maximumFractionDigits: 2,
                                                                              },
                                                                            )}`}
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
                        {/* AddOns END */}

                        {/* Subtotal per Room START */}
                        <Grid
                          item
                          xs={12}
                          mt={1}
                          sx={{ ...alignCenter, justifyContent: 'flex-end' }}
                        >
                          <Box pr={2}>
                            <Typography
                              variant="priceBreakdownTitle"
                              sx={{ fontSize: 16, wordWrap: 'break-word' }}
                            >
                              {`Subtotal for 
                                                        ${room.roomType} 
                                                        ${i + 1}: 
                                                        ${
                                                          info.filters.currency
                                                        } 
                                                        ${(
                                                          (x.price +
                                                            x.addOns
                                                              .map(
                                                                (addOn) =>
                                                                  addOn.count *
                                                                  addOn.price,
                                                              )
                                                              .reduce(
                                                                (a, b) => a + b,
                                                              )) *
                                                          info.filters
                                                            .currencyRate *
                                                          dateDifference
                                                        ).toLocaleString(
                                                          undefined,
                                                          {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                          },
                                                        )}`}
                            </Typography>
                          </Box>
                        </Grid>
                        {/* Subtotal per Room END */}
                      </>
                    ))}
                </Grid>
                {/* Subtotal per Room START */}
                <Grid item xs={12} mt={2} pr={2} pb={2}>
                  <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                    <Typography
                      variant="priceBreakdownTitle"
                      sx={{ fontSize: 16, textAlign: 'center' }}
                    >
                      {`Subtotal for ${room.roomAttributes.roomName}: `}
                    </Typography>
                  </Box>
                  <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                    <Typography
                      variant="priceBreakdownTitle"
                      sx={{ fontSize: 20, textAlign: 'center' }}
                    >
                      {`
                                        
                                        ${info.filters.currency} ${(
                        info.roomSelection.rooms
                          .filter((e) => e.id.includes(room.roomType))
                          .map(
                            (e) =>
                              e.price +
                              (e.addOns
                                ? e.addOns
                                    .map((addOn) => addOn.count * addOn.price)
                                    .reduce((a, b) => a + b)
                                : 0),
                          )
                          .reduce((a, b) => a + b, 0) *
                        info.filters.currencyRate *
                        dateDifference
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                    </Typography>
                  </Box>
                </Grid>
                <Divider />
                {/* Subtotal per Room END */}
              </Grid>
            </Grid>
          ) : (
            <> </>
          ),
        )
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <Card
          sx={{
            backgroundColor: Theme.palette.background.default,
            borderRadius: Theme.shape.borderRadius,
          }}
        >
          <Box px={2} py={2}>
            <Box
              my={1}
              sx={{ ...alignCenter, justifyContent: 'space-between' }}
            >
              <Typography
                variant="priceBreakdownTitle"
                sx={{
                  fontWeight: Theme.typography.fontWeightBlack,
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
              >
                {`Rooms: `}
              </Typography>
              <Typography variant="priceBreakdownTitle" sx={{ fontSize: 16 }}>
                {info.filters.currency && info.filters.currencyRate
                  ? `${info.filters.currency} ${(
                      (info.roomSelection.rooms.length
                        ? info.roomSelection.rooms
                            .map((room) => room.price)
                            .reduce((a, b) => a + b)
                        : 0) *
                      info.filters.currencyRate *
                      dateDifference
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : 0}
              </Typography>
            </Box>
            <Box
              my={1}
              sx={{ ...alignCenter, justifyContent: 'space-between' }}
            >
              <Typography
                variant="priceBreakdownTitle"
                sx={{
                  fontWeight: Theme.typography.fontWeightBlack,
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
              >
                {`Add Ons: `}
              </Typography>
              <Typography variant="priceBreakdownTitle" sx={{ fontSize: 16 }}>
                {info.filters.currency && info.filters.currencyRate
                  ? `${info.filters.currency} ${(
                      (info.roomSelection.rooms.length
                        ? info.roomSelection.rooms
                            .map((room) =>
                              room.addOns.length
                                ? room.addOns
                                    .map((addOn) => addOn.count * addOn.price)
                                    .reduce((a, b) => a + b)
                                : 0,
                            )
                            .reduce((a, b) => a + b)
                        : 0) *
                      info.filters.currencyRate *
                      dateDifference
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : 0}
              </Typography>
            </Box>
            <Box sx={{ ...alignCenter, justifyContent: 'space-between' }}>
              <Typography
                variant="priceBreakdownTitle"
                sx={{
                  fontWeight: Theme.typography.fontWeightBlack,
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}
              >
                {`Total: `}
              </Typography>
              <Typography variant="priceBreakdownTotal" sx={{ fontSize: 24 }}>
                {info.filters.currency && info.filters.currencyRate
                  ? `${info.filters.currency} ${(
                      info.roomSelection.totalPayment *
                      info.filters.currencyRate *
                      dateDifference
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : 0}
              </Typography>
            </Box>
          </Box>
        </Card>
        <PaymentOptions />
        <PaymentButton />
      </Grid>
    </>
  )
}

export default PriceBreakDownContent
