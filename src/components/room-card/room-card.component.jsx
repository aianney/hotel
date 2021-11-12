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
import { IoBedOutline, IoPeopleOutline } from 'react-icons/io5'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { BsTextareaResize } from 'react-icons/bs'
import { AppContext, Theme } from '..'

const RoomCard = (props) => {
  const iconSize = 10,
    // eslint-disable-next-line
    { info, setInfo } = useContext(AppContext),
    [showAddOns, setShowAddOns] = useState(false),
    [rate, setRate] = useState(''),
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
    [additionalAdults, setAdditionalAdults] = useState(0),
    [environmentFee, setEnvironmentFee] = useState(0),
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
    addAdditionalAdult = () => {
      setAdditionalAdults(additionalAdults + 1)
    },
    removeAdditionalAdult = () => {
      setAdditionalAdults(additionalAdults - 1)
    },
    addEnvironmentFee = () => {
      setEnvironmentFee(environmentFee + 1)
    },
    removeEnvironmentFee = () => {
      setEnvironmentFee(environmentFee - 1)
    },
    updateRoomContent = () => {
      if (props.roomType) {
        props.roomType[props.index].adults = adults
        props.roomType[props.index].children = children
        props.onRoomChange(props.roomType)
      }
    },
    cardInfo = [
      {
        icon: <IoPeopleOutline />,
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
  }, [children, adults])

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
                    background: `url(${props.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="pageTitle" ml={1}>
                      {`${info.filters.currency} ` +
                        (info.reservationInformation
                          ? (
                              parseInt(
                                info.reservationInformation.room[props.id]
                                  .roomRates[0][4],
                              ) * info.filters.currencyRate
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })
                          : 1000)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{}}>
                    <FormControl
                      sx={{ mr: 1, mt: -3, minWidth: 120, width: '100%' }}
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
                          backgroundColor: Theme.palette.background.light,
                        }}
                      >
                        <MenuItem value="">Best Available Rate</MenuItem>
                        <MenuItem value={10}>Rate 2</MenuItem>
                        <MenuItem value={20}>Rate 3</MenuItem>
                        <MenuItem value={30}>Best Available Rate</MenuItem>
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
                              <AiOutlineMinus size={iconSize} />
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
                              <AiOutlinePlus size={iconSize} />
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
                              <AiOutlineMinus size={iconSize} />
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
                              <AiOutlinePlus size={iconSize} />
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
                    <Box pl={3} pt={3}>
                      <Card
                        sx={{
                          backgroundColor: Theme.palette.light.main,
                          width: '100%',
                        }}
                      >
                        <Grid container>
                          {/* Additional Adults START */}
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
                                {additionalAdults} Additional Adult
                                {additionalAdults === 1 ? '' : 's'}
                              </Typography>
                            </Box>
                            <ButtonGroup variant="contained">
                              <Button
                                sx={{
                                  backgroundColor:
                                    Theme.palette.background.light,
                                }}
                                disabled={adults === 0 ? true : false}
                                onClick={() =>
                                  info.reservationInformation.room &&
                                  additionalAdults === 0
                                    ? ''
                                    : removeAdditionalAdult
                                }
                              >
                                <AiOutlineMinus size={iconSize} />
                              </Button>
                              <Button
                                sx={{
                                  backgroundColor:
                                    Theme.palette.background.light,
                                }}
                                onClick={() =>
                                  info.reservationInformation.room &&
                                  adults ===
                                    info.reservationInformation.room[props.id]
                                      .roomAttributes.maxPax
                                    ? ''
                                    : addAdditionalAdult
                                }
                              >
                                <AiOutlinePlus size={iconSize} />
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
                                {environmentFee} Environment Fee
                              </Typography>
                            </Box>
                            <ButtonGroup variant="contained">
                              <Button
                                sx={{
                                  backgroundColor:
                                    Theme.palette.background.light,
                                }}
                                disabled={environmentFee === 0 ? true : false}
                                onClick={() =>
                                  environmentFee === 0
                                    ? ''
                                    : removeEnvironmentFee
                                }
                              >
                                <AiOutlineMinus size={iconSize} />
                              </Button>
                              <Button
                                sx={{
                                  backgroundColor:
                                    Theme.palette.background.light,
                                }}
                                onClick={() => addEnvironmentFee}
                              >
                                <AiOutlinePlus size={iconSize} />
                              </Button>
                            </ButtonGroup>
                          </Grid>
                          {/* Children Tab END */}
                        </Grid>
                      </Card>
                    </Box>
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
