import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  Zoom,
} from '@material-ui/core'
import { IoBedOutline } from 'react-icons/io5'
import { BsPeople, BsDash, BsPlus, BsTextareaResize } from 'react-icons/bs'
import { AppContext, Theme } from '..'

const RoomCard = (props) => {
  const iconSize = 12,
    // eslint-disable-next-line
    { info, setInfo } = useContext(AppContext),
    [showAddOns, setShowAddOns] = useState(false),
    [rate, setRate] = useState(''),
    [rateValues] = useState(
      info.reservationInformation
        ? info.reservationInformation.room[props.id].roomRates
            .map((rate) => rate[2])
            .filter((value, index, self) => self.indexOf(value) === index)
        : [],
    ),
    [rateNames] = useState(
      info.reservationInformation
        ? info.reservationInformation.room[props.id].roomRates
            .map((rate) => rate[3])
            .filter((value, index, self) => self.indexOf(value) === index)
        : [],
    ),
    [children, setChildren] = useState(
      info.reservationInformation &&
        info.filters.guests.children >
          info.reservationInformation.room[props.id].roomAttributes.maxChild
        ? info.reservationInformation.room[props.id].roomAttributes.maxChild
        : info.filters && info.filters.guests.children
        ? info.filters.guests.children
        : 0,
    ),
    [adults, setAdults] = useState(
      info.reservationInformation &&
        info.filters.guests.adults >
          info.reservationInformation.room[props.id].roomAttributes.maxPax
        ? info.reservationInformation.room[props.id].roomAttributes.maxPax
        : info.filters && info.filters.guests.adults
        ? info.filters.guests.adults
        : 1,
    ),
    [addOns, setAddOns] = useState(
      info.reservationInformation.addOnList.map((addOn) => {
        const addOnTemplate = {
          id: addOn.id,
          description: addOn.descr,
          price: parseInt(addOn.price),
          count: 0,
        }
        return addOnTemplate
      }),
    ),
    addAdult = () => {
      setAdults((adults) => adults + 1)
    },
    removeAdult = () => {
      setAdults((adults) => adults - 1)
    },
    addChild = () => {
      setChildren((children) => children + 1)
    },
    removeChild = () => {
      setChildren((children) => children - 1)
    },
    addtoAddOn = (addOnId) => {
      let updates = info.roomSelection.rooms[props.id].addOns.map((addOn) =>
        addOn.id === addOnId
          ? {
              ...addOn,
              count: addOn.count + 1,
            }
          : addOn,
      )

      setAddOns(updates)
    },
    removefromAddOn = (addOnId) => {
      let updates = info.roomSelection.rooms[props.id].addOns.map((addOn) =>
        addOn.id === addOnId
          ? {
              ...addOn,
              count: addOn.count - 1,
            }
          : addOn,
      )

      setAddOns(updates)
    },
    updateRoomContent = () => {
      let updates = props.rooms
        ? props.rooms.map((room) =>
            room.id === props.roomId
              ? {
                  id: room.id,
                  adults: adults,
                  children: children,
                  addOns: addOns,
                  price: room.price,
                }
              : room,
          )
        : []

      props.setRooms(updates)
    },
    cardInfo = [
      {
        icon: <BsPeople />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].roomAttributes.maxPax +
            info.reservationInformation.room[props.id].roomAttributes.maxPax +
            ' people'
          : null,
      },
      {
        icon: <IoBedOutline />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].roomAttributes.bedsNumber
          : null,
      },
      {
        icon: <BsTextareaResize />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].roomAttributes.roomSize
          : null,
      },
    ]

  useEffect(() => {
    updateRoomContent()
    // eslint-disable-next-line
  }, [addOns, adults, children])

  return (
    <Grid item xs={props.count > 1 ? 11 : 12} md={6}>
      <Zoom in={true}>
        <Card
          sx={{
            backgroundColor: Theme.palette.background.light,
            position: 'relative',
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: 'flex',
                justifyContent: 'flex-center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', sm: '250px' },
                  height: {
                    xs: '200px',
                    sm: '100%',
                    transform: `scale(${showAddOns ? 1.25 : 1}) translate(${
                      showAddOns ? `-10%` : `0%`
                    })`,
                    transition: 'all ease-out .5s',
                    backgroundImage: `url("${props.img}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box p={3}>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography variant="pageTitle" ml={1}>
                      {`${info.filters.currency} ` +
                        (info.reservationInformation
                          ? (
                              (parseInt(
                                info.reservationInformation.room[props.id]
                                  .roomRates[0][4],
                              ) +
                                addOns
                                  .map((addOn) => addOn.count * addOn.price)
                                  .reduce((a, b) => a + b)) *
                              info.filters.currencyRate
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : 1000)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{}}>
                    <FormControl
                      sx={{ mr: 1, mt: -5, minWidth: 120, width: '100%' }}
                    >
                      <Select
                        defaultValue={10}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        variant="filled"
                        displayEmpty
                        disableUnderline={true}
                        sx={{
                          ...Theme.cardSelect,
                          backgroundColor: 'rgba(0,0,0,0)',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0)',
                          },
                          '&:active': {
                            backgroundColor: 'rgba(0,0,0,0)',
                          },
                          '&:focus': {
                            backgroundColor: 'rgba(0,0,0,0)',
                          },
                        }}
                      >
                        {rateValues.map((rates, index) => (
                          <MenuItem value={rate}>{rateNames[index]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {cardInfo.map((i) => (
                    <Grid
                      item
                      xs={12 / cardInfo.length}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      {i.icon}
                      <Typography
                        variant="roomCardLabel"
                        sx={{ textAlign: 'center' }}
                      >
                        {i.label}
                      </Typography>
                    </Grid>
                  ))}

                  <Grid item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: Theme.palette.light.main,
                        width: '100%',
                      }}
                    >
                      <Grid container>
                        {/* Adults Tab START */}
                        <Grid
                          item
                          py={2}
                          xs={6}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Box pb={2}>
                            <Typography variant="filterText">
                              {adults} Adult{adults === 1 ? '' : 's'}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={adults === 1 ? true : false}
                              onClick={() =>
                                info.reservationInformation.room && adults === 1
                                  ? ''
                                  : removeAdult()
                              }
                            >
                              <BsDash size={iconSize} />
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                info.reservationInformation &&
                                adults ===
                                  info.reservationInformation.room[props.id]
                                    .roomAttributes.maxPax
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                info.reservationInformation.room &&
                                adults ===
                                  info.reservationInformation.room[props.id]
                                    .roomAttributes.maxPax
                                  ? ''
                                  : addAdult()
                              }
                            >
                              <BsPlus size={iconSize} />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        {/* Adults Tab END */}

                        {/* Children Tab START */}
                        <Grid
                          item
                          py={2}
                          xs={6}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Box pb={2}>
                            <Typography variant="filterText">
                              {children} Child{children === 1 ? '' : 'ren'}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={children === 0 ? true : false}
                              onClick={() =>
                                children === 0 ? '' : removeChild()
                              }
                            >
                              <BsDash size={iconSize} />
                            </Button>
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                info.reservationInformation &&
                                children ===
                                  info.reservationInformation.room[props.id]
                                    .roomAttributes.maxChild
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                info.reservationInformation.room &&
                                children ===
                                  info.reservationInformation.room[props.id]
                                    .roomAttributes.maxChild
                                  ? ''
                                  : addChild()
                              }
                            >
                              <BsPlus size={iconSize} />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        {/* Children Tab END */}
                      </Grid>
                    </Card>
                  </Grid>

                  <Collapse
                    in={showAddOns}
                    timeout={{ enter: 500, exit: 500 }}
                    sx={{ width: '110%' }}
                  >
                    {addOns ? (
                      addOns.map((addOn, index) => (
                        <Box pl={3} pt={3}>
                          <Card
                            sx={{
                              backgroundColor: Theme.palette.light.main,
                              width: '100%',
                            }}
                          >
                            <Box px={3}>
                              <Grid container>
                                {/* AddOns START */}
                                <Grid
                                  item
                                  py={2}
                                  xs={12}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                  }}
                                >
                                  <Box>
                                    <Typography variant="filterText">
                                      {addOn.count} - {addOn.description}
                                    </Typography>
                                    <Box>
                                      <Typography
                                        variant="filterText"
                                        sx={{
                                          fontWeight: 400,
                                          fontStyle: 'italic',
                                        }}
                                      >
                                        {`${info.filters.currency} ` +
                                          (
                                            addOn.count *
                                            addOn.price *
                                            info.filters.currencyRate
                                          ).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          })}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <ButtonGroup
                                    variant="contained"
                                    sx={{ height: 22.5 }}
                                  >
                                    <Button
                                      sx={{
                                        backgroundColor:
                                          Theme.palette.background.light,
                                      }}
                                      disabled={
                                        addOn.count === 0 ? true : false
                                      }
                                      onClick={() =>
                                        info.reservationInformation.room &&
                                        info.reservationInformation.room
                                          .length &&
                                        addOn.count === 0
                                          ? ''
                                          : removefromAddOn(addOn.id)
                                      }
                                    >
                                      <BsDash size={iconSize} />
                                    </Button>
                                    <Button
                                      sx={{
                                        backgroundColor:
                                          Theme.palette.background.light,
                                      }}
                                      onClick={() =>
                                        info.reservationInformation.room &&
                                        info.reservationInformation.room.length
                                          ? addtoAddOn(addOn.id)
                                          : ''
                                      }
                                    >
                                      <BsPlus size={iconSize} />
                                    </Button>
                                  </ButtonGroup>
                                </Grid>
                                {/* AddOns Tab END */}
                              </Grid>
                            </Box>
                          </Card>
                        </Box>
                      ))
                    ) : (
                      <></>
                    )}
                  </Collapse>

                  <Grid item xs={12}>
                    <Button
                      sx={{
                        width: '100%',
                        fontWeight: Theme.typography.fontWeightBold,
                      }}
                      onClick={() => setShowAddOns(!showAddOns)}
                    >
                      <Box py={0}>{showAddOns ? 'Hide' : 'Show'} Add-Ons</Box>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {props.disabled ? (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,.5)',
                backdropFilter: 'blur(1.5px)',
              }}
            ></Box>
          ) : (
            <></>
          )}
        </Card>
      </Zoom>
    </Grid>
  )
}

export default RoomCard
