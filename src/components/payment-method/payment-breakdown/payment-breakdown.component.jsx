import React, { useContext } from 'react'
import { Box, Card, Divider, Grid, Typography } from '@mui/material'
import { AppContext, Theme } from '../..'
import moment from 'moment'

const PaymentBreakdown = () => {
  const {
      info: { filters, roomSelection, reservationInformation },
    } = useContext(AppContext),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference =
      filters.reservationDates.end && filters.reservationDates.start
        ? moment
            .duration(
              moment(filters.reservationDates.end).diff(
                moment(filters.reservationDates.start),
              ),
            )
            .asDays()
        : 1

  return (
    <Card sx={{ p: 2 }}>
      {reservationInformation && reservationInformation.room ? (
        reservationInformation.room.map((room) =>
          roomSelection.rooms.filter((e) => e.id.includes(room.roomType))
            .length ? (
            <Grid container sx={{ pt: 2 }}>
              <Grid
                item
                xs={12}
                sx={{ ...alignCenter, justifyContent: 'space-between' }}
              >
                <Typography
                  variant="priceBreakdownTitle"
                  sx={{
                    fontWeight: Theme.typography.bold,
                    fontSize: Theme.typography.fontSizeSm,
                  }}
                >
                  {room.roomName}{' '}
                  {roomSelection.rooms
                    .map((e) => (e.id.includes(room.roomType) ? e : null))
                    .filter((e) => e != null).length > 1
                    ? `(${
                        roomSelection.rooms
                          .map((e) => (e.id.includes(room.roomType) ? e : null))
                          .filter((e) => e != null).length
                      } rooms)`
                    : ''}
                </Typography>
                <Typography
                  variant="priceBreakdownTotal"
                  sx={{
                    fontSize: Theme.typography.fontSize,
                    textAlign: 'center',
                    display: roomSelection.rooms
                      .filter((x) => x.id.includes(room.roomType))
                      .map((room) =>
                        room.addOns
                          .map((addOn) => addOn.count)
                          .reduce((a, b) => a + b),
                      )
                      .reduce((a, b) => a + b)
                      ? 'none'
                      : 'block',
                  }}
                >
                  {`${filters.currency} ${(
                    roomSelection.rooms
                      .filter((e) => e.id.includes(room.roomType))
                      .map(
                        (e) =>
                          e.price +
                          (e.addOns
                            ? e.addOns
                                .map(
                                  (addOn) =>
                                    addOn.count * addOn.price * dateDifference,
                                )
                                .reduce((a, b) => a + b)
                            : 0),
                      )
                      .reduce((a, b) => a + b, 0) *
                    dateDifference *
                    filters.currencyRate
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Typography>
              </Grid>
              <Grid item xs={12} mb={1}>
                <Grid container mb={2}>
                  {roomSelection.rooms
                    .filter((x) => x.id.includes(room.roomType))
                    .map((x, i) => (
                      <>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display:
                              !roomSelection.rooms
                                .filter((x) => x.id.includes(room.roomType))
                                .map((a) =>
                                  a.addOns
                                    .map((addOn) => addOn.count)
                                    .reduce((a, b) => a + b),
                                )
                                .reduce((a, b) => a + b) ||
                              roomSelection.rooms.filter((x) =>
                                x.id.includes(room.roomType),
                              ).length === 1
                                ? 'none'
                                : 'block',
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
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: roomSelection.rooms
                              .filter((x) => x.id.includes(room.roomType))
                              .map((room) =>
                                room.addOns
                                  .map((addOn) => addOn.count)
                                  .reduce((a, b) => a + b),
                              )
                              .reduce((a, b) => a + b)
                              ? 'block'
                              : 'none',
                          }}
                        >
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
                                                              dateDifference *
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
                          <Grid
                            item
                            xs={12}
                            sx={{
                              ...alignCenter,
                              justifyContent: 'space-between',
                              display: 'none',
                            }}
                          >
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
                            <Typography
                              variant="priceBreakdownTitle"
                              sx={{
                                fontStyle: 'italic',
                                fontWeight: 500,
                                wordWrap: 'break-word',
                              }}
                            >
                              {`${filters.currency} ${(
                                x.addOns
                                  .map((addOn) => addOn.count * addOn.price)
                                  .reduce((a, b) => a + b) *
                                filters.currencyRate *
                                dateDifference
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}`}
                            </Typography>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {/* Show AddOns Label END */}

                        {/* AddOns START */}

                        {x.addOns.length ? (
                          x.addOns.map((addOn, index) =>
                            addOn.count ? (
                              <Grid
                                item
                                xs={12}
                                sx={{
                                  ...alignCenter,
                                  justifyContent: 'space-between',
                                  pl: 1,
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
                                      wordWrap: 'break-word',
                                    }}
                                  >
                                    {`${
                                      addOn.count
                                        ? `${filters.currency} 
                                                                        ${(
                                                                          addOn.count *
                                                                          addOn.price *
                                                                          dateDifference
                                                                        ).toLocaleString(
                                                                          undefined,
                                                                          {
                                                                            minimumFractionDigits: 2,
                                                                            maximumFractionDigits: 2,
                                                                          },
                                                                        )}`
                                        : ''
                                    }`}
                                  </Typography>
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
                  <Grid
                    item
                    xs={12}
                    mt={1}
                    mb={0}
                    sx={{
                      display: roomSelection.rooms
                        .filter((x) => x.id.includes(room.roomType))
                        .map((room) =>
                          room.addOns
                            .map((addOn) => addOn.count)
                            .reduce((a, b) => a + b),
                        )
                        .reduce((a, b) => a + b)
                        ? 'flex'
                        : 'none',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography
                      variant="priceBreakdownTotal"
                      sx={{
                        fontSize: Theme.typography.fontSizeSm,
                        textAlign: 'center',
                      }}
                    >
                      {`Total for ${room.roomName}: ${filters.currency} ${(
                        roomSelection.rooms
                          .filter((e) => e.id.includes(room.roomType))
                          .map(
                            (e) =>
                              e.price * dateDifference +
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
                  </Grid>
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
      <Grid
        item
        xs={12}
        sx={{ ...alignCenter, justifyContent: 'flex-end', py: 1 }}
      >
        <Typography
          variant="priceBreakdownTotal"
          sx={{ fontSize: `calc(${Theme.typography.fontSizeLg} - 4px)` }}
        >
          {`Total: ${filters.currency} ${(
            roomSelection.totalPayment * filters.currencyRate
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
        </Typography>
      </Grid>
    </Card>
  )
}

export default PaymentBreakdown
