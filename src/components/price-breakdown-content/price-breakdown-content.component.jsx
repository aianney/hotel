import React, { useContext } from 'react'
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material'
import { AppContext, Theme } from '..'
import { BsDashCircleFill } from 'react-icons/bs'
import moment from 'moment'

const PriceBreakDownContent = () => {
  const {
      info,
      info: { roomSelection, reservationInformation, filters },
      setInfo,
    } = useContext(AppContext),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference = moment
      .duration(
        moment(filters.reservationDates.end).diff(
          moment(filters.reservationDates.start),
        ),
      )
      .asDays(),
    removeRoomType = (roomType) => {
      const roomRemoved = roomSelection.rooms.length
          ? roomSelection.rooms
              .map((room) => (!room.id.includes(roomType) ? room : null))
              .filter((room) => room)
          : [],
        updates = {
          ...info,
          roomSelection: {
            ...roomSelection,
            rooms: roomRemoved,
            totalPayment: roomRemoved.length
              ? roomRemoved
                  .map((room) =>
                    !room.id.includes(roomType)
                      ? room.price +
                        (room.addOns.length
                          ? room.addOns
                              .map((addOn) => addOn.price * addOn.count)
                              .reduce((a, b) => a + b)
                          : 0)
                      : 0,
                  )
                  .reduce((a, b) => a + b)
              : 0,
          },
        }

      setInfo(updates)
      console.log(roomRemoved)
    }

  return (
    <>
      {reservationInformation && reservationInformation.room ? (
        reservationInformation.room.map((room) =>
          roomSelection.rooms.filter((e) => e.id.includes(room.roomType))
            .length ? (
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ ...alignCenter, justifyContent: 'space-between' }}
              >
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{
                    fontWeight: Theme.typography.bold,
                    fontSize: Theme.typography.fontSizeLg,
                  }}
                >
                  {room.roomName}
                </Typography>
                <IconButton
                  color="error"
                  sx={{ width: 'auto', fontSize: Theme.typography.fontSizeLg }}
                  onClick={() => removeRoomType(room.roomType)}
                >
                  <BsDashCircleFill />
                </IconButton>
              </Grid>
              <Grid item xs={12} mb={1}>
                <Grid container>
                  {roomSelection.rooms
                    .filter((x) => x.id.includes(room.roomType))
                    .map((x, i) => (
                      <>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display:
                              roomSelection.rooms.filter((x) =>
                                x.id.includes(room.roomType),
                              ).length === 1
                                ? 'none'
                                : '',
                          }}
                        >
                          <Box
                            px={1}
                            sx={{
                              ...alignCenter,
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{ fontSize: Theme.typography.fontSize }}
                              >
                                {`Room ${i + 1}`}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        {/*Room Rate START */}
                        <Grid item xs={12}>
                          <Box
                            pl={1}
                            sx={{
                              ...alignCenter,
                              justifyContent: 'space-between',
                            }}
                          >
                            <Box>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{ fontStyle: 'italic', fontWeight: 500 }}
                              >
                                {x.rate}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{ fontStyle: 'italic', fontWeight: 500 }}
                              >
                                {`${filters.currency}
                                                            ${(
                                                              x.price *
                                                              filters.currencyRate
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
                            <Box pl={1} sx={{ width: '50%' }}>
                              <Typography
                                variant="priceBreakdownTitle"
                                sx={{
                                  fontStyle: 'italic',
                                  fontWeight: 500,
                                  wordWrap: 'break-word',
                                }}
                              >
                                Add Ons:
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
                                  pl={1}
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
                                        fontWeight: 500,
                                      }}
                                    >
                                      {`${filters.currency} 
                                                                            ${(
                                                                              addOn.price *
                                                                              addOn.count *
                                                                              filters.currencyRate *
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
                          mb={2}
                          sx={{
                            ...alignCenter,
                            justifyContent: 'flex-end',
                            display:
                              roomSelection.rooms.filter((x) =>
                                x.id.includes(room.roomType),
                              ).length > 1 &&
                              x.addOns
                                .map((addOn) => addOn.count)
                                .reduce((a, b) => a + b) > 0
                                ? 'flex'
                                : 'none',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="priceBreakdownTitle"
                              sx={{ wordWrap: 'break-word' }}
                            >
                              {`Subtotal for 
                                                        Room
                                                        ${i + 1}: 
                                                        ${filters.currency} 
                                                        ${(
                                                          (x.price +
                                                            x.addOns
                                                              .map(
                                                                (addOn) =>
                                                                  addOn.count *
                                                                  addOn.price *
                                                                  dateDifference,
                                                              )
                                                              .reduce(
                                                                (a, b) => a + b,
                                                              )) *
                                                          filters.currencyRate
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
                <Grid item xs={12} my={2}>
                  <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                    <Typography
                      variant="priceBreakdownTitle"
                      sx={{ textAlign: 'center' }}
                    >
                      {`Subtotal for ${room.roomName}: `}
                    </Typography>
                  </Box>
                  <Box sx={{ ...alignCenter, justifyContent: 'flex-end' }}>
                    <Typography
                      variant="priceBreakdownTotal"
                      sx={{ fontSize: '1.5rem', textAlign: 'center' }}
                    >
                      {`
                                        
                                        ${filters.currency} ${(
                        roomSelection.rooms
                          .filter((e) => e.id.includes(room.roomType))
                          .map(
                            (e) =>
                              e.price +
                              (e.addOns
                                ? e.addOns
                                    .map(
                                      (addOn) =>
                                        addOn.count *
                                        addOn.price *
                                        dateDifference,
                                    )
                                    .reduce((a, b) => a + b)
                                : 0),
                          )
                          .reduce((a, b) => a + b, 0) * filters.currencyRate
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
    </>
  )
}

export default PriceBreakDownContent
