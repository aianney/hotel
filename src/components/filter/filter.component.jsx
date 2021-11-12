import React, { useState, useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Fade,
  FormControl,
  Grid,
  MenuItem,
  Typography,
  Select,
  Slide,
  Collapse,
} from '@material-ui/core'
import { AppContext, Theme } from '../index'
import axios from 'axios'
import { BsCalendar4Event, BsCalendar4Range } from 'react-icons/bs'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineTeam,
  AiOutlineUser,
} from 'react-icons/ai'
import moment from 'moment'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import { data } from 'jquery'

const Filter = (props) => {
  const isInitialMount = useRef(true),
    { info, setInfo } = useContext(AppContext),
    history = useHistory(),
    errorStyle = (activator) => {
      return {
        height: activator ? '' : '0px',
        padding: activator ? '' : '0px !important',
        margin: '0px',
        overflow: 'hidden',
        transition: 'all .5s ease',
      }
    },
    iconSize = 22,
    defaults = {
      children: {
        max: 10,
        min: 0,
      },
      adults: {
        max: 20,
        min: 1,
      },
      room: {
        adults: 1,
        children: 0,
        addOns: {
          adults: 0,
          children: 0,
        },
        rates: 0,
      },
    },
    [adults, setAdults] = useState(
      info.filters.guests.adults ? info.filters.guests.adults : 1,
    ),
    [children, setChildren] = useState(
      info.filters.guests.children ? info.filters.guests.children : 0,
    ),
    [startDate, setStartDate] = useState(
      info.filters.reservationDates.start
        ? info.filters.reservationDates.start
        : new Date(),
    ),
    [startDatePickerOpen, setStartDatePickerOpen] = useState(false),
    [endDate, setEndDate] = useState(
      info.filters.reservationDates.end
        ? info.filters.reservationDates.end
        : new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
    ),
    [endDatePickerOpen, setEndDatePickerOpen] = useState(false),
    // eslint-disable-next-line
    [displayCurrency, setDisplayCurrency] = useState(false),
    [currencies, setCurrencies] = useState([]),
    [currency, setCurrency] = useState('PHP'),
    [currencyRate, setCurrencyRate] = useState(1),
    [noRoom, setNoRoom] = useState(false),
    [bookingError, setBookingError] = useState(''),
    checkDate = () => {
      const start = moment(startDate).format('YYYY-MM-DD'),
        end = moment(endDate).format('YYYY-MM-DD'),
        url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=${start}&dateCheckOut=${end}`
      // url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=2022-01-28&dateCheckOut=2022-01-29`;

      axios
        .get(url)
        .then((r) => {
          r.data.state === 'Error'
            ? errorDate(r.data.remarks)
            : r.data.data[0].room.length === 0
            ? noRoomAvailable()
            : reserveDate(r.data.data[0])
        })
        .catch((e) => console.log(e))
    },
    applyCurrencies = () => {
      axios({
        method: 'get',
        url: 'https://currency-exchange.p.rapidapi.com/listquotes',
        headers: {
          'x-rapidapi-key':
            'a5e9a0b4fbmshe3c522987820eb7p1b3ed8jsn83f8c8be32d8',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      })
        .then((r) => {
          setCurrencies([...r.data, 'PHP'].sort())
        })
        .catch((e) => {
          console.log(e)
          setDisplayCurrency(false)
        })
    },
    currencySetRate = () => {
      axios({
        method: 'get',
        url: `https://currency-exchange.p.rapidapi.com/exchange?from=PHP&to=${currency}&q=1.0`,
        headers: {
          'x-rapidapi-key':
            'a5e9a0b4fbmshe3c522987820eb7p1b3ed8jsn83f8c8be32d8',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      })
        .then((r) => {
          setCurrencyRate(r.data)
        })
        .catch((e) => {
          console.log(e)
          setDisplayCurrency(false)
        })
    },
    cancelPanel = () => {
      props.setFilterOpen(false)
      setCurrency(info.filters.currency)
    },
    filterApply = (data) => {
      let rooms =
        info.filters.reservationDates.start === startDate &&
        info.filters.reservationDates.end === endDate
          ? {
              ...info,
              reservationInformation: data,
            }
          : {
              ...info,
              roomSelection: {
                deluxeSeaView: [],
                superiorSeaView: [],
                standardRoom: [],
                totalPayment: 0,
              },
              reservationInformation: data,
            }

      if (
        props.setDateChange &&
        info.filters.reservationDates.start &&
        info.filters.reservationDates.end &&
        (info.filters.reservationDates.start !== startDate ||
          info.filters.reservationDates.end !== endDate)
      ) {
        props.setDateChange(true)
        props.setDateChange(false)
      }

      setInfo({
        ...info,
        filters: {
          ...info.filters,
          reservationDates: {
            start: startDate,
            end: endDate,
          },
          guests: {
            adults: adults,
            children: children,
          },
          currency: currency,
          currencyRate: currencyRate,
        },
        roomSelection: {
          ...info.roomSelection,
          totalPayment:
            info.roomSelection.deluxeSeaView.price ||
            info.roomSelection.superiorSeaView.price ||
            info.roomSelection.standardRoom.price
              ? [
                  ...info.roomSelection.deluxeSeaView,
                  ...info.roomSelection.superiorSeaView,
                  ...info.roomSelection.standardRoom,
                ]
                  .map((s) => s.price)
                  .reduce((a, b) => a + b)
              : 0,
        },
      })

      info.filters.reservationDates.start = startDate
      info.filters.reservationDates.end = endDate
      info.filters.guests.adults = adults
      info.filters.guests.children = children
      info.filters.currency = currency
      info.filters.currencyRate = currencyRate

      setInfo(rooms)
      setNoRoom(false)
      setBookingError('')

      props.setFilterOpen(false)
    },
    setReserveDate = (data) => {
      filterApply(data)
      history.push({ pathname: '/room-selection' })
    },
    reserveDate = (data) =>
      props.page === 'intro' ? setReserveDate(data) : filterApply(data),
    noRoomAvailable = () => {
      setNoRoom(true)
      setBookingError('')
      setTimeout(() => {
        setNoRoom(false)
      }, 5000)
    },
    errorDate = (remarks) => {
      setNoRoom(false)
      setBookingError(remarks)
      setTimeout(() => {
        setBookingError('')
      }, 5000)
    }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      setEndDatePickerOpen(true)
    }
  }, [startDate])

  useEffect(() => {
    applyCurrencies()
  }, [])

  useEffect(() => {
    currencySetRate()
    // eslint-disable-next-line
  }, [currency])

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          zIndex: 1200,
        }}
      >
        {/* Backdrop START */}
        <Fade in={props.filterOpen}>
          <Box
            onClick={() => props.setFilterOpen(false)}
            sx={{
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,.75)',
              bottom: 0,
              height: '100vh',
              left: 0,
              width: '100vw',
              position: 'fixed',
            }}
          ></Box>
        </Fade>
        {/* Backdrop END */}

        {/* Filter Card START */}
        <Slide direction="up" in={props.filterOpen}>
          <Card
            sx={{
              backgroundColor: Theme.palette.background.light,
              width: {
                xs: '100%',
                sm: '50vw',
                md: '80vw',
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
                md: 20,
              },
              right: {
                xs: 0,
                sm: 30,
                md: 0,
              },
              left: {
                xs: 0,
                sm: 'auto',
                md: 0,
              },
              margin: {
                md: 'auto',
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadius,
              },
              borderBottomLeftRadius: {
                xs: 0,
                sm: Theme.shape.borderRadius,
              },
              borderBottomRightRadius: {
                xs: 0,
                sm: Theme.shape.borderRadius,
              },
            }}
          >
            <Box p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={errorStyle(noRoom)}>
                  <Collapse in={noRoom} timeout={{ enter: 500, exit: 500 }}>
                    <Box>
                      <Alert severity="error">
                        There are no rooms available on the dates you've chosen
                        — let's go check another date!
                      </Alert>
                    </Box>
                  </Collapse>
                </Grid>
                <Grid item xs={12} sx={errorStyle(bookingError)}>
                  <Collapse
                    in={bookingError}
                    timeout={{ enter: 500, exit: 500 }}
                  >
                    <Box>
                      <Alert severity="error">{bookingError}</Alert>
                    </Box>
                  </Collapse>
                </Grid>
                {/* Reservation Dates START */}
                <Grid item xs={12} md={props.page === 'intro' ? 6 : 4}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.light.main,
                      width: '100%',
                    }}
                  >
                    <Box ml={3} mt={3}>
                      <Typography variant="filterLabel">
                        Reservation Dates
                      </Typography>
                    </Box>
                    <Box px={3}>
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          showToolbar={false}
                          sx={{
                            fontFamily: Theme.typography.fontFamily.sansSerif,
                          }}
                          minDate={new Date()}
                          onChange={() => {}}
                          onAccept={setStartDate}
                          onClose={() => setStartDatePickerOpen(false)}
                          open={startDatePickerOpen}
                          okText={'Confirm Check-In Date'}
                          renderInput={({
                            disabled,
                            inputProps,
                            onChange,
                            ref,
                            value,
                            ...other
                          }) => (
                            <div ref={ref} {...other}>
                              <input
                                disabled={disabled}
                                onChange={onChange}
                                style={{ display: 'none' }}
                                value={value}
                                {...inputProps}
                              />
                              <Button
                                onClick={() =>
                                  setStartDatePickerOpen(
                                    (startDatePickerOpen) =>
                                      !startDatePickerOpen,
                                  )
                                }
                                sx={Theme.typography.filterText}
                              >
                                <Box
                                  py={3}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                  }}
                                >
                                  <BsCalendar4Event size={iconSize} />
                                  {moment(startDate).format(
                                    '(dddd) MMMM DD, YYYY',
                                  )}
                                </Box>
                              </Button>
                            </div>
                          )}
                          value={startDate ? startDate : new Date()}
                        />
                      </LocalizationProvider>
                      <Divider />
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          showToolbar={false}
                          sx={{
                            fontFamily: Theme.typography.fontFamily.sansSerif,
                          }}
                          minDate={
                            new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                          }
                          onChange={() => {}}
                          onAccept={setEndDate}
                          onClose={() => setEndDatePickerOpen(false)}
                          open={endDatePickerOpen}
                          okText={'Confirm Check-Out Date'}
                          renderInput={({
                            ref,
                            inputProps,
                            disabled,
                            onChange,
                            value,
                            ...other
                          }) => (
                            <div ref={ref} {...other}>
                              <input
                                disabled={disabled}
                                onChange={onChange}
                                style={{ display: 'none' }}
                                value={value}
                                {...inputProps}
                              />
                              <Button
                                sx={Theme.typography.filterText}
                                onClick={() =>
                                  setEndDatePickerOpen(
                                    (endDatePickerOpen) => !endDatePickerOpen,
                                  )
                                }
                              >
                                <Box
                                  py={3}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                  }}
                                >
                                  <BsCalendar4Range size={iconSize} />
                                  {moment(endDate).format(
                                    '(dddd) MMMM DD, YYYY',
                                  )}
                                </Box>
                              </Button>
                            </div>
                          )}
                          value={endDate}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Card>
                </Grid>
                {/* Reservation Dates END */}

                {/* Guests Per Room START */}
                <Grid item xs={12} md={props.page === 'intro' ? 6 : 4}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.light.main,
                      width: '100%',
                    }}
                  >
                    <Box mt={3} ml={3}>
                      <Typography variant="filterLabel">
                        Guests per Room
                      </Typography>
                    </Box>
                    <Box px={3}>
                      {/* Adults Tab START */}
                      <Box
                        py={2}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <AiOutlineUser size={iconSize * 2} />
                          <Typography variant="filterText" ml={3}>
                            {adults} Adult{adults === 1 ? '' : 's'}
                          </Typography>
                        </Box>
                        <ButtonGroup variant="contained">
                          <Button
                            disabled={
                              adults === defaults.adults.min ? true : false
                            }
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            onClick={() =>
                              adults === defaults.adults.min
                                ? ''
                                : setAdults((adults) => adults - 1)
                            }
                          >
                            <AiOutlineMinus size={iconSize} />
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              adults === defaults.adults.max ? true : false
                            }
                            onClick={() =>
                              adults === defaults.adults.max
                                ? ''
                                : setAdults((adults) => adults + 1)
                            }
                          >
                            <AiOutlinePlus size={iconSize} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                      {/* Adults Tab END */}

                      <Divider />

                      {/* Children Tab START */}
                      <Box
                        py={2}
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex',
                          }}
                        >
                          <AiOutlineTeam size={iconSize * 2} />
                          <Typography variant="filterText" ml={3}>
                            {children} Child{children === 1 ? '' : 'ren'}
                          </Typography>
                        </Box>
                        <ButtonGroup variant="contained">
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              children === defaults.children.min ? true : false
                            }
                            onClick={() =>
                              children === defaults.children.min
                                ? ''
                                : setChildren((children) => children - 1)
                            }
                          >
                            <AiOutlineMinus size={iconSize} />
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: Theme.palette.background.light,
                            }}
                            disabled={
                              children === defaults.children.max ? true : false
                            }
                            onClick={() =>
                              children === children.max
                                ? ''
                                : setChildren((children) => children + 1)
                            }
                          >
                            <AiOutlinePlus size={iconSize} />
                          </Button>
                        </ButtonGroup>
                      </Box>
                      {/* Children Tab END */}
                    </Box>
                  </Card>
                </Grid>
                {/* Guests Per Room END */}

                <Grid
                  item
                  xs={props.page === 'intro' ? 0 : 12}
                  md={props.page === 'intro' ? 0 : 4}
                  sx={{ display: props.page === 'intro' ? 'none' : 'block' }}
                >
                  <Card sx={{ backgroundColor: Theme.palette.light.main }}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Box my={3} ml={3}>
                          <Typography variant="filterLabel">
                            Language
                          </Typography>
                          <FormControl
                            sx={{ mt: -3, minWidth: 120, width: '100%' }}
                          >
                            {/* <Select
                                                            defaultValue={info.filters.currency}
                                                            value={currency}
                                                            onChange={e => setCurrency(e.target.value)}
                                                            variant="filled"
                                                            displayEmpty
                                                            disableUnderline={true}
                                                            sx={{
                                                                ...Theme.cardSelect,
                                                                backgroundColor: "rgba(0,0,0,0)"
                                                            }}
                                                        >
                                                            <MenuItem value="PHP">
                                                                PHP
                                                            </MenuItem>
                                                            <MenuItem value={10}>Rate 2</MenuItem>
                                                            <MenuItem value={20}>Rate 3</MenuItem>
                                                            <MenuItem value={30}>Best Available Rate</MenuItem>
                                                        </Select> */}
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box mt={3} mr={3}>
                          <Typography variant="filterLabel">
                            Currency
                          </Typography>
                          <FormControl
                            sx={{ mt: -3, minWidth: 120, width: '100%' }}
                          >
                            <Select
                              defaultValue={info.filters.currency}
                              value={
                                info.filters.currency &&
                                info.filters.currency === currency
                                  ? info.filters.currency
                                  : currency
                              }
                              onChange={(e) => setCurrency(e.target.value)}
                              variant="filled"
                              displayEmpty
                              disableUnderline={true}
                              sx={{
                                ...Theme.cardSelect,
                                backgroundColor: 'rgba(0,0,0,0)',
                              }}
                            >
                              {currencies
                                .sort((a, b) => b - a)
                                .map((cur) => (
                                  <MenuItem value={cur}>{cur}</MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Buttons START */}
            <Box
              mb={2}
              mx={2}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Box>
                {/* Cancel Buttons START */}
                <Button
                  onClick={() => cancelPanel()}
                  sx={{
                    borderRadius: {
                      xs: Theme.shape.borderRadius,
                      sm: Theme.shape.borderRadius,
                    },
                  }}
                >
                  <Box
                    px={2}
                    py={1}
                    sx={{
                      textDecoration: 'none',
                      color: 'unset',
                    }}
                  >
                    Cancel
                  </Box>
                </Button>
                {/* Cancel Buttons END */}

                {/* Action Buttons START */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: Theme.shape.borderRadius,
                  }}
                  onClick={checkDate}
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
                    {props.text}
                  </Box>
                </Button>
                {/* Action Buttons END */}
              </Box>
            </Box>
            {/* Buttons END */}
          </Card>
        </Slide>
        {/* Filter Card END */}
      </Box>
    </>
  )
}

export default Filter
