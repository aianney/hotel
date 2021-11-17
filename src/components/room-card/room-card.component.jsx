import React, { useState, useContext } from 'react'
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
import moment from 'moment'

const RoomCard = (props) => {
  const { info, setInfo } = useContext(AppContext),
    roomIndex = info.roomSelection.rooms.length
      ? info.roomSelection.rooms
        .map((room, index) => (room.id.match(props.roomId) ? index : null))
        .filter((room) => room != null)[0]
      : 0,
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
    iconSize = 12,
    dateDifference = moment
      .duration(
        moment(info.filters.reservationDates.end).diff(
          moment(info.filters.reservationDates.start),
        ),
      )
      .asDays(),

    addAdult = () => {
      const
        addedAdult = info.roomSelection &&
          info.roomSelection.rooms &&
          info.roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                adults: room.adults + 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: addedAdult,
          }
        }

      setInfo(updates);
    },
    removeAdult = () => {
      const
        removedAdult = info.roomSelection &&
          info.roomSelection.rooms &&
          info.roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                adults: room.adults - 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: removedAdult,
          }
        }

      setInfo(updates);
    },
    addChild = () => {
      const
        addedChild = info.roomSelection &&
          info.roomSelection.rooms &&
          info.roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                children: room.children + 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: addedChild,
          }
        }

      setInfo(updates);
    },
    removeChild = () => {
      const
        removedChild = info.roomSelection &&
          info.roomSelection.rooms &&
          info.roomSelection.rooms.map((room, i) =>
            room.id.match(props.roomId)
              ? {
                ...room,
                children: room.children - 1,
              }
              : room,
          ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: removedChild,
          }
        }

      setInfo(updates);
    },
    addtoAddOn = (addOnId) => {
      const addedAddOn =
        info.roomSelection &&
        info.roomSelection.rooms &&
        info.roomSelection.rooms.map((room, i) =>
          room.id.match(props.roomId) && room.addOns.length
            ? {
              ...room,
              addOns: room.addOns.map((addOn) =>
                addOn.id === addOnId
                  ? {
                    ...addOn,
                    count: addOn.count + 1,
                  }
                  : addOn,
              ),
            }
            : room,
        ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: addedAddOn,
            totalPayment: addedAddOn.length
              ? addedAddOn
                .map(
                  (room) =>
                    room.price +
                    (room.addOns.length
                      ? room.addOns
                        .map((addOn) => addOn.price * addOn.count)
                        .reduce((a, b) => a + b)
                      : 0),
                )
                .reduce((a, b) => a + b)
              : 0,
          },
        }
      setInfo(updates)
    },
    removefromAddOn = (addOnId) => {
      const removedAddOn =
        info.roomSelection &&
        info.roomSelection.rooms &&
        info.roomSelection.rooms.map((room, i) =>
          i === roomIndex && room.addOns.length
            ? {
              ...room,
              addOns: room.addOns.map((addOn) =>
                addOn.id === addOnId
                  ? {
                    ...addOn,
                    count: addOn.count - 1,
                  }
                  : addOn,
              ),
            }
            : room,
        ),
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: removedAddOn,
            totalPayment: removedAddOn.length
              ? removedAddOn
                .map(
                  (room, i) =>
                    room.price +
                    (room.addOns.length
                      ? room.addOns
                        .map((addOn) => addOn.price * addOn.count)
                        .reduce((a, b) => a + b)
                      : 0),
                )
                .reduce((a, b) => a + b)
              : 0,
          },
        }

      setInfo(updates)
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
                    transform: `scale(${showAddOns ? 1.25 : 1}) translateY(${showAddOns ? `-10%` : `0%`
                      }) translateX(${showAddOns ? `-10%` : `0%`})`,
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
                              (info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex].addOns
                                  .length
                                ? info.roomSelection.rooms[roomIndex].addOns
                                  .map((addOn) => addOn.count * addOn.price)
                                  .reduce((a, b) => a + b)
                                : 0)) *
                            info.filters.currencyRate
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : 1000)}
                      {dateDifference > 1 ? `/day` : ``}
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
                              {info.roomSelection.rooms &&
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex]
                                ? info.roomSelection.rooms[roomIndex].adults
                                : 0}{' '}
                              Adult
                              {info.roomSelection.rooms &&
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex]
                                ? info.roomSelection.rooms[roomIndex].adults ===
                                  1
                                  ? ''
                                  : 's'
                                : ''}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                info.roomSelection.rooms &&
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex] &&
                                info.roomSelection.rooms[roomIndex].adults <= 1
                              }
                              onClick={() =>
                                info.reservationInformation.room.length &&
                                  info.roomSelection.rooms[roomIndex].adults === 1
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
                                info.reservationInformation.room &&
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex].adults >=
                                info.reservationInformation.room[props.id]
                                  .roomAttributes.maxPax
                              }
                              onClick={() =>
                                info.reservationInformation.room &&
                                  info.roomSelection.rooms.length &&
                                  info.roomSelection.rooms[roomIndex].adults >=
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
                              {info.roomSelection.rooms.length ?
                                info.roomSelection.rooms[roomIndex].children : 0} Child{info.roomSelection.rooms.length &&
                                  info.roomSelection.rooms[roomIndex].children === 1 ? '' : 'ren'}
                            </Typography>
                          </Box>
                          <ButtonGroup variant="contained">
                            <Button
                              sx={{
                                backgroundColor: Theme.palette.background.light,
                              }}
                              disabled={
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex].children === 0
                              }
                              onClick={() =>
                                info.roomSelection.rooms.length &&
                                  info.roomSelection.rooms[roomIndex].children === 0 ? '' : removeChild()
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
                                info.roomSelection.rooms.length &&
                                info.roomSelection.rooms[roomIndex].children >=
                                info.reservationInformation.room[props.id]
                                  .roomAttributes.maxChild
                              }
                              onClick={() =>
                                info.reservationInformation.room &&
                                  info.roomSelection.rooms.length &&
                                  info.roomSelection.rooms[roomIndex].children >=
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
                    {info.roomSelection.rooms.length &&
                      info.roomSelection.rooms[roomIndex] &&
                      info.roomSelection.rooms[roomIndex].addOns ? (
                      info.roomSelection.rooms[roomIndex].addOns.map(
                        (addOn, index) => (
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
                                        {`${addOn.count ? `(${addOn.count})` : ''
                                          }`}{' '}
                                        {addOn.description}
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
                                          info.reservationInformation.room
                                            .length &&
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
                                          info.reservationInformation.room
                                            .length &&
                                            info.reservationInformation.room
                                              .length
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
                        ),
                      )
                    ) : (
                      <></>
                    )}
                  </Collapse>

                  <Grid item xs={12}>
                    <Box mb={3}>
                      <Button
                        sx={{
                          width: '100%',
                          fontWeight: Theme.typography.fontWeightBold,
                        }}
                        onClick={() => setShowAddOns(!showAddOns)}
                      >
                        <Box py={0}>{showAddOns ? 'Hide' : 'Show'} Add-Ons</Box>
                      </Button>
                    </Box>
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
