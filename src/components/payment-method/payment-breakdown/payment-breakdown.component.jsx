import React, { useState, useContext } from 'react'
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { AppContext, Theme } from '../..'
import moment from 'moment'

const roomSelection = {
    rooms: [
      {
        adults: 1,
        children: 0,
        addOns: [
          {
            id: 2,
            description: 'Extra Person (13 y/o and above)',
            price: 1000,
            count: 1,
          },
          {
            id: 3,
            description: 'SBMA Enviromental Fee',
            price: 1000,
            count: 1,
          },
        ],
        id: '0-SSV',
        price: 11500,
        rate: 'Best Available Rate',
      },
      {
        adults: 1,
        children: 0,
        addOns: [
          {
            id: 2,
            description: 'Extra Person (13 y/o and above)',
            price: 1000,
            count: 1,
          },
          {
            id: 3,
            description: 'SBMA Enviromental Fee',
            price: 1000,
            count: 0,
          },
        ],
        id: '1-STD',
        price: 10500,
        rate: 'Best Available Rate',
      },
      {
        adults: 1,
        children: 0,
        addOns: [
          {
            id: 2,
            description: 'Extra Person (13 y/o and above)',
            price: 1000,
            count: 0,
          },
          {
            id: 3,
            description: 'SBMA Enviromental Fee',
            price: 1000,
            count: 0,
          },
        ],
        id: '2-STD',
        price: 10500,
        rate: 'Best Available Rate',
      },
    ],
    totalPayment: 35500,
  },
  reservationInformation = {
    room: [
      {
        roomType: 'SSV',
        roomName: 'Standard Sea View',
        available: 1,
        roomAttributes: {
          maxPax: 2,
          maxChild: 2,
          roomDescriptionLong:
            'Wake up in a sweeping view of the ocean from your balcony haven. Look ahead with views of the blue skies meeting the deep clear waters.',
          bedsNumber: '2 Double Beds',
          roomSize: '32 sqm.',
          roomImage: 'input image location here',
        },
        roomRates: [
          [
            '2021-11-24',
            'SSV',
            'BAR',
            'Best Available Rate',
            '11500.00',
            'Standard Sea View',
            2,
          ],
          [
            '2021-11-24',
            'SSV',
            'PR',
            'Promo Rate',
            '9500.00',
            'Standard Sea View',
            4,
          ],
          [
            '2021-11-24',
            'SSV',
            'WBF',
            'Room without Breakfast',
            '10500.00',
            'Standard Sea View',
            5,
          ],
        ],
      },
      {
        roomType: 'STD',
        roomName: 'Standard Room',
        available: 2,
        roomAttributes: {
          maxPax: 2,
          maxChild: 2,
          roomDescriptionLong:
            'Be enchanted with a picture-perfect oasis of landscapes and flowers. Let your senses be filled with optimism through glimpses of the resort gardens.',
          bedsNumber: '2 Double Beds',
          roomSize: '28 sqm.',
          roomImage: 'input image location here',
        },
        roomRates: [
          [
            '2021-11-24',
            'STD',
            'BAR',
            'Best Available Rate',
            '10500.00',
            'Standard Room',
            3,
          ],
          [
            '2021-11-24',
            'STD',
            'WBF',
            'Room without Breakfast',
            '9500.00',
            'Standard Room',
            6,
          ],
        ],
      },
    ],
    addOnList: [
      {
        id: 2,
        descr: 'Extra Person (13 y/o and above)',
        entryID: '8514',
        image_name: null,
        isActive: 1,
        isPax: 1,
        categoryID: 1,
        price: '1000.00',
        categoryType: 'Extras',
      },
      {
        id: 3,
        descr: 'SBMA Enviromental Fee',
        entryID: '3',
        image_name: null,
        isActive: 3,
        isPax: 0,
        categoryID: 0,
        price: '1000.00',
        categoryType: '',
      },
    ],
  }

const PaymentBreakdown = () => {
  // eslint-disable-next-line
  const { info, setInfo } = useContext(AppContext),
    [addOnOpen, setAddOnOpen] = useState(
      roomSelection.rooms.map((room) => ({ id: room.id, expand: false })),
    ),
    alignCenter = { display: 'flex', alignItems: 'center' },
    dateDifference =
      info.filters.reservationDates.end && info.filters.reservationDates.start
        ? moment
            .duration(
              moment(info.filters.reservationDates.end).diff(
                moment(info.filters.reservationDates.start),
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
                    fontSize: Theme.typography.fontSize,
                    width: '50%',
                  }}
                >
                  {room.roomName} {}
                </Typography>
                <Typography
                  variant="priceBreakdownTotal"
                  sx={{
                    fontSize: Theme.typography.fontSize,
                    textAlign: 'center',
                  }}
                >
                  {`
                                        
                                        ${info.filters.currency} ${(
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
                      .reduce((a, b) => a + b, 0) * info.filters.currencyRate
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
                                {`${info.filters.currency}
                                                            ${(
                                                              x.price *
                                                              info.filters
                                                                .currencyRate
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
                          <Grid item xs={12}>
                            <Button
                              sx={{
                                ...alignCenter,
                                justifyContent: 'space-between',
                              }}
                              fullWidth
                              onClick={() => {
                                const update = addOnOpen.map((addOn) =>
                                  addOn.id.match(x.id)
                                    ? { ...addOn, expand: !addOn.expand }
                                    : addOn,
                                )
                                console.log(update)
                                setAddOnOpen(update)
                              }}
                            >
                              <Box pl={1}>
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
                              <Box pl={1}>
                                <Typography
                                  variant="priceBreakdownTitle"
                                  sx={{
                                    fontStyle: 'italic',
                                    fontWeight: 500,
                                    wordWrap: 'break-word',
                                  }}
                                >
                                  {`${x.addOns
                                    .map((addOn) => addOn.count * addOn.price)
                                    .reduce((a, b) => a + b)
                                    .toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}`}
                                </Typography>
                              </Box>
                            </Button>
                          </Grid>
                        ) : (
                          <></>
                        )}
                        {/* Show AddOns Label END */}

                        {/* AddOns START */}
                        <Collapse
                          in={
                            addOnOpen
                              .map((e) => (e.id.match(x.id) ? e.expand : null))
                              .filter((e) => e != null)[0]
                          }
                        >
                          {x.addOns.length ? (
                            x.addOns.map((addOn, index) =>
                              addOn.count ? (
                                <Grid item xs={12}>
                                  <Box
                                    pl={1}
                                    sx={{
                                      ...alignCenter,
                                      justifyContent: 'space-between',
                                      width: '100%',
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
                                  </Box>
                                </Grid>
                              ) : (
                                <></>
                              ),
                            )
                          ) : (
                            <> </>
                          )}
                        </Collapse>
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
                                                        ${
                                                          info.filters.currency
                                                        } 
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
                                                          info.filters
                                                            .currencyRate
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
    </Card>
  )
}

export default PaymentBreakdown
