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
} from '../../components'
import { BsSliders } from 'react-icons/bs'

const RoomSelection = () => {
  const { info, setInfo } = useContext(AppContext),
    iconSize = 22,
    history = useHistory(),
    [filterOpen, setFilterOpen] = useState(false),
    [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false),
    [dateChange, setDateChange] = useState(false),
    [proceed, setProceed] = useState(false),
    // Function to go back to Intro Page if no data has been set START
    backToIntro = () => {
      if (
        !info.filters.reservationDates.start ||
        !info.filters.reservationDates.end ||
        !info.reservationInformation
      ) {
        history.push('/')
      }
    },
    // Function to go back to Intro Page if no data has been set END

    updateTotalPayment = () => {
      setInfo({
        ...info,
        roomSelection: {
          ...info.roomSelection,
          rooms: info.roomSelection.rooms,
          totalPayment:
            info.roomSelection.rooms && info.roomSelection.rooms.length
              ? info.roomSelection.rooms
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
    document.body.scrollTop = document.documentElement.scrollTop = 0
    // eslint-disable-next-line
  }, [dateChange])

  return (
    <>
      <Box my={4}>
        <PageStepper activeStep={0} />
      </Box>
      <Box px={4}>
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
                    fontSize: 14,
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
      />
      {/* Price Breakdown END */}

      {/* Action Button START */}
      <CustomButton
        onClick={() => {
          setProceed(true)
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
          }}
          disabled={
            info.roomSelection.rooms && !info.roomSelection.rooms.length
          }
        >
          <Box
            px={2}
            py={1}
            sx={{
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
