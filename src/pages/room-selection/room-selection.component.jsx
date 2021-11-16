import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Grid, IconButton, Typography } from '@material-ui/core'
import {
  AppContext,
  CustomButton,
  Filter,
  PageStepper,
  PriceBreakdown,
  Room,
  Theme,
} from '../../components'
import { BsSliders } from 'react-icons/bs'

const RoomSelection = () => {
  const { info, setInfo } = useContext(AppContext),
    iconSize = 22,
    defaults = {
      room: {
        adults: info.filters.guests.adults,
        children: info.filters.guests.children,
        addOns: info.reservationInformation
          ? info.reservationInformation.addOnList
              .map((addOn) => {
                const addOnTemplate = {
                  id: addOn.id,
                  description: addOn.descr,
                  price: parseInt(addOn.price),
                  count: 0,
                }
                return addOnTemplate
              })
              .sort()
          : [],
      },
    },
    history = useHistory(),
    [filterOpen, setFilterOpen] = useState(false),
    [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false),
    [dateChange, setDateChange] = useState(false),
    [rooms, setRooms] = useState(info.roomSelection.rooms),
    [proceed, setProceed] = useState(false),
    // Function to go back to Intro Page if no data has been set START
    backToIntro = () => {
      if (
        info.filters.reservationDates.start === null ||
        info.filters.reservationDates.end === null
      ) {
        history.push('/')
      }
    },
    // Function to go back to Intro Page if no data has been set END

    // Functions for Deluxe Sea View START
    addRoom = (index) => {
      setRooms((room) => [
        ...room,
        {
          ...defaults.room,
          id: info.reservationInformation
            ? rooms.length +
              '-' +
              info.reservationInformation.room[index].roomType
            : null,
          price: info.reservationInformation
            ? info.reservationInformation.room[index].roomRates
                .filter((e) => e[3])
                .map((e) => parseFloat(e[4]))
                .reduce((a, b) => a + b)
            : 0,
          rate: info.reservationInformation
            ? info.reservationInformation.room[index].roomRates[0][3]
            : 0,
        },
      ])
    },
    removeRoom = (roomType) => {
      setRooms(
        rooms.filter(
          (r, index) =>
            index !==
            rooms
              .map((room, index) =>
                room.id.indexOf(roomType) !== -1 ? index : null,
              )
              .filter((e) => e != null)
              .slice(-1)[0],
        ),
      )
    },
    // Functions for Deluxe Sea View END

    updateTotalPayment = () => {
      setInfo({
        ...info,
        roomSelection: {
          ...info.roomSelection,
          rooms: rooms,
          totalPayment:
            rooms && rooms.length
              ? rooms
                  .map(
                    (room) =>
                      room.price +
                      (room.addOns.length
                        ? room.addOns
                            .map((addOn) => addOn.count * addOn.price)
                            .reduce((a, b) => a + b)
                        : 0),
                  )
                  .reduce((a, b) => a + b)
              : 0,
        },
      })
    }

  useEffect(() => {
    backToIntro()
    document.title =
      'Acea Beach Resort - Select the rooms that you want to book'

    if (dateChange) {
      setRooms([])
    }

    updateTotalPayment()

    // eslint-disable-next-line
  }, [rooms, dateChange])

  return (
    <>
      <Box px={4}>
        <Box my={4}>
          <PageStepper activeStep={0} />
        </Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'block',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="pageTitle">Select Rooms</Typography>
              <IconButton
                onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
                p={0}
              >
                <BsSliders size={iconSize} />
              </IconButton>
            </Box>
            <Box mb={3}>
              <Typography variant="pageSubtitle">
                Select how many rooms you will use while staying.
                <Typography
                  variant="pageSubtitle"
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    fontStyle: 'italic',
                    fontSize: 16,
                  }}
                >
                  {` (Swipe left or right on the cards if you have selected more than one of the following rooms)`}
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {info.reservationInformation ? (
        info.reservationInformation.room.map((roomInformation, index) => (
          <>
            <Room
              information={roomInformation}
              index={index}
              rooms={rooms}
              addRoom={addRoom}
              removeRoom={removeRoom}
              setRooms={setRooms}
              updateTotalPayment={updateTotalPayment}
            />
          </>
        ))
      ) : (
        <></>
      )}

      {/* Filter START */}
      <Filter
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        setDateChange={setDateChange}
        text="Apply Now"
      />
      {/* Filter END */}

      {/* Price Breakdown START */}
      <PriceBreakdown
        priceBreakdownOpen={priceBreakdownOpen}
        setPriceBreakdownOpen={setPriceBreakdownOpen}
        proceed={proceed}
        setProceed={setProceed}
        rooms={rooms}
        setRooms={setRooms}
      />
      {/* Price Breakdown END */}

      {/* Action Button START */}
      <CustomButton
        onClick={() => {
          setProceed(true)
          updateTotalPayment()
          setPriceBreakdownOpen(true)
        }}
        disabled={info.roomSelection.rooms && !info.roomSelection.rooms.length}
      >
        Proceed
      </CustomButton>
      {/* Action Button END */}

      <Box p={2} sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 201 }}>
        <Button
          onClick={() => {
            setPriceBreakdownOpen((priceBreakdownOpen) => !priceBreakdownOpen)
            updateTotalPayment()
          }}
          disabled={
            info.roomSelection.rooms && !info.roomSelection.rooms.length
          }
          sx={{
            borderRadius: Theme.shape.borderRadius,
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
            Price Breakdown
          </Box>
        </Button>
      </Box>
    </>
  )
}

export default RoomSelection
