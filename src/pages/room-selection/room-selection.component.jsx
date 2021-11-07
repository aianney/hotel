import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Box, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import {
  AppContext,
  Filter,
  PageStepper,
  RoomCard,
  Theme,
} from '../../components'
import {
  AiOutlineCalendar,
  AiOutlineInfoCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai'
import StandardRoomImage from '../../assets/media/images/standard-room.png'
import SuperiorSeaViewImage from '../../assets/media/images/superior-sea-view.png'
import DeluxeSeaViewImage from '../../assets/media/images/deluxe-sea-view.png'

const RoomSelection = (props) => {
  const { info, setInfo } = useContext(AppContext),
    iconSize = 22,
    defaults = {
      room: {
        adults: info.filters.guests.adults,
        children: info.filters.guests.children,
        addOns: {
          adults: 0,
          children: 0,
        },
        rate: '',
        price: 1000,
      },
    },
    history = useHistory()

  const [filterOpen, setFilterOpen] = useState(false)

  const [deluxeSeaView, setDeluxeSeaView] = useState(
      info.roomSelection.deluxeSeaView,
    ),
    [superiorSeaView, setSuperiorSeaView] = useState(
      info.roomSelection.superiorSeaView,
    ),
    [standardRoom, setStandardRoom] = useState(info.roomSelection.standardRoom)

  const addDSVRoom = () => {
      setDeluxeSeaView((dsv) => [
        ...dsv,
        {
          ...defaults.room,
          id: 'DSV-' + deluxeSeaView.length,
          price: parseFloat(
            info.reservationInformation.room[0].RoomRates[0][4],
          ),
          rate: info.reservationInformation.room[0].RoomRates[0][3],
        },
      ])
    },
    removeDSVRoom = () => {
      setDeluxeSeaView(
        deluxeSeaView.filter((r, index) => index !== deluxeSeaView.length - 1),
      )
    },
    addSSVRoom = () => {
      setSuperiorSeaView((ssv) => [
        ...ssv,
        {
          ...defaults.room,
          id: 'SSV-' + superiorSeaView.length,
          price: parseFloat(
            info.reservationInformation.room[1].RoomRates[0][4],
          ),
          rate: info.reservationInformation.room[1].RoomRates[0][3],
        },
      ])
    },
    addSTDRoom = () => {
      setStandardRoom((std) => [
        ...std,
        {
          ...defaults.room,
          id: 'SSV-' + standardRoom.length,
          price: parseFloat(
            info.reservationInformation.room[2].RoomRates[0][4],
          ),
          rate: info.reservationInformation.room[2].RoomRates[0][3],
        },
      ])
    },
    removeSTDRoom = () => {
      setStandardRoom(
        standardRoom.filter((r, index) => index !== standardRoom.length - 1),
      )
    }

  useEffect(() => {
    backToIntro()
    setInfo({
      ...info,
      roomSelection: {
        ...info.roomSelection,
        deluxeSeaView: deluxeSeaView,
        superiorSeaView: superiorSeaView,
        standardRoom: standardRoom,
      },
    })
    // eslint-disable-next-line
  }, [deluxeSeaView, superiorSeaView, standardRoom])

  const backToIntro = () => {
    if (
      info.filters.reservationDates.start === null ||
      info.filters.reservationDates.end === null
    ) {
      history.push('/')
    }
  }

  return (
    <>
      <Box px={4}>
        <Box my={4}>
          <PageStepper activeStep={0} />
        </Box>
        <Grid container>
          <Grid
            item
            xs={10}
            md={6}
            sx={{
              display: 'block',
            }}
          >
            <Box>
              <Typography variant="pageTitle">Select Rooms</Typography>
            </Box>
            <Box mb={3}>
              <Typography variant="pageSubtitle">
                Select how many rooms you will use while staying.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            md={6}
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => setFilterOpen((filterOpen) => !filterOpen)}
              p={0}
            >
              <AiOutlineCalendar size={iconSize} />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Deluxe Sea View Selection START */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid
            item
            px={3}
            xs={12}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              pl={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="title">Deluxe Sea View</Typography>
              <Button
                sx={{
                  padding: 0,
                  margin: 0,
                }}
                onClick={() => history.push('/room-selection/0')}
              >
                <AiOutlineInfoCircle size={iconSize} />
              </Button>
            </Box>

            <ButtonGroup variant="contained">
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() => removeDSVRoom()}
                disabled={deluxeSeaView.length === 0 ? true : false}
              >
                <AiOutlineMinus size={iconSize} />
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.light.main,
                }}
              >
                {deluxeSeaView.length}
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() => addDSVRoom()}
                disabled={
                  info.reservationInformation &&
                  deluxeSeaView.length >=
                    info.reservationInformation.room[0].Available
                    ? true
                    : false
                }
              >
                <AiOutlinePlus />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              px={3}
              spacing={2}
              sx={{
                display: {
                  xs: 'iflex',
                  md: '',
                },
                overflowX: {
                  xs: 'scroll',
                  md: 'auto',
                },
                flexWrap: {
                  xs: 'nowrap',
                  md: 'wrap',
                },
              }}
            >
              {deluxeSeaView.length === 0 ? (
                <RoomCard disabled={true} img={DeluxeSeaViewImage} id={0} />
              ) : (
                deluxeSeaView.map((data, index) => (
                  <RoomCard
                    key={'DSV-' + index}
                    img={DeluxeSeaViewImage}
                    index={index}
                    data={data}
                    count={deluxeSeaView.length}
                    id={0}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Deluxe Sea View Selection END */}

      {/* Superior Sea View Selection START */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid
            item
            px={3}
            xs={12}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              pl={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="title">Superior Sea View</Typography>
              <Button
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <AiOutlineInfoCircle size={iconSize} />
              </Button>
            </Box>

            <ButtonGroup variant="contained">
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() =>
                  setSuperiorSeaView(
                    superiorSeaView.filter(
                      (r, index) => index !== superiorSeaView.length - 1,
                    ),
                  )
                }
                disabled={superiorSeaView.length === 0 ? true : false}
              >
                <AiOutlineMinus size={iconSize} />
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.light.main,
                }}
              >
                {superiorSeaView.length}
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() => addSSVRoom()}
                disabled={
                  info.reservationInformation &&
                  superiorSeaView.length >=
                    info.reservationInformation.room[1].Available
                    ? true
                    : false
                }
              >
                <AiOutlinePlus />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              px={3}
              spacing={2}
              sx={{
                display: {
                  xs: 'iflex',
                  md: '',
                },
                overflowX: {
                  xs: 'scroll',
                  md: 'auto',
                },
                flexWrap: {
                  xs: 'nowrap',
                  md: 'wrap',
                },
              }}
            >
              {superiorSeaView.length === 0 ? (
                <RoomCard disabled={true} img={SuperiorSeaViewImage} id={1} />
              ) : (
                superiorSeaView.map((data, index) => (
                  <RoomCard
                    key={'SSV-' + index}
                    img={SuperiorSeaViewImage}
                    index={index}
                    data={data}
                    count={superiorSeaView.length}
                    id={1}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Superior Sea View Selection END */}

      {/* Standard Room Selection START */}
      <Box mb={12}>
        <Grid container spacing={3}>
          <Grid
            item
            px={3}
            xs={12}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              pl={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="title">Standard Room</Typography>
              <Button
                sx={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <AiOutlineInfoCircle size={iconSize} />
              </Button>
            </Box>

            <ButtonGroup variant="contained">
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() => removeSTDRoom()}
                disabled={standardRoom.length === 0 ? true : false}
              >
                <AiOutlineMinus size={iconSize} />
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.light.main,
                }}
              >
                {standardRoom.length}
              </Button>
              <Button
                sx={{
                  backgroundColor: Theme.palette.background.light,
                }}
                onClick={() => addSTDRoom()}
                disabled={
                  info.reservationInformation &&
                  standardRoom.length >=
                    info.reservationInformation.room[2].Available
                    ? true
                    : false
                }
              >
                <AiOutlinePlus />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              px={3}
              spacing={2}
              sx={{
                display: {
                  xs: 'iflex',
                  md: '',
                },
                overflowX: {
                  xs: 'scroll',
                  md: 'auto',
                },
                flexWrap: {
                  xs: 'nowrap',
                  md: 'wrap',
                },
              }}
            >
              {standardRoom.length === 0 ? (
                <RoomCard disabled={true} img={StandardRoomImage} id={2} />
              ) : (
                standardRoom.map((data, index) => (
                  <RoomCard
                    key={'STD-' + index}
                    img={StandardRoomImage}
                    index={index}
                    data={data}
                    count={standardRoom.length}
                    id={2}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* Standard Room Selection END */}

      <Filter
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        text="Apply Now"
      />

      <Box
        p={2}
        sx={{
          backgroundColor: Theme.palette.background.light,
          bottom: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          left: 0,
          position: 'fixed',
          width: '100vw',
        }}
      >
        <Box px={4}>
          <NavLink to="guest-details">
            <Button
              variant="contained"
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
                Continue
              </Box>
            </Button>
          </NavLink>
        </Box>
      </Box>
    </>
  )
}

export default RoomSelection
