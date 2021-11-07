import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Fade,
  Grid,
  Typography,
  Slide,
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

const Filter = (props) => {
  const { info, setInfo } = useContext(AppContext),
    history = useHistory(),
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
        : new Date(),
    ),
    [endDatePickerOpen, setEndDatePickerOpen] = useState(false),
    checkDate = () => {
      // eslint-disable-next-line
      const start = moment(startDate).format('YYYY-MM-DD'),
        // eslint-disable-next-line
        end = moment(endDate).format('YYYY-MM-DD'),
        // url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=${start}&dateCheckOut=${end}`;
        url = `https://hotelreservations.ph/gpDBProcess/process.php?request=getAvailability&dateCheckIn=2022-01-28&dateCheckOut=2022-01-29`

      axios
        .get(url)
        .then((r) => {
          r.data.state === 'Error'
            ? console.log('Error')
            : r.data.data[0].room.length === 0
            ? console.log('No Room')
            : reserveDate(r.data.data[0])
        })
        .catch((e) => console.log(e))
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
                total: 0,
              },
              reservationInformation: data,
            }

      info.filters.reservationDates.start = startDate
      info.filters.reservationDates.end = endDate
      info.filters.guests.adults = adults
      info.filters.guests.children = children

      setInfo(rooms)

      props.setFilterOpen(false)
    },
    setReserveDate = (data) => {
      filterApply(data)
      history.push({ pathname: '/room-selection' })
    },
    reserveDate = (data) =>
      props.page === 'intro' ? setReserveDate(data) : filterApply(data)

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
              },
              position: 'fixed',
              bottom: {
                xs: 0,
                sm: 100,
              },
              right: {
                xs: 0,
                sm: 30,
              },
              borderRadius: {
                xs: Theme.shape.borderRadius,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomLeftRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
              borderBottomRightRadius: {
                xs: 0,
                sm: Theme.shape.borderRadiusLg,
              },
            }}
          >
            <Box p={2}>
              <Grid container spacing={3}>
                {/* Reservation Dates START */}
                <Grid item xs={12}>
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
                          minDate={new Date()}
                          onChange={setStartDate}
                          onClose={() => (
                            // eslint-disable-next-line
                            setStartDatePickerOpen(false),
                            setEndDatePickerOpen(true)
                          )}
                          open={startDatePickerOpen}
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
                                    'MMMM. DD YYYY, dddd',
                                  )}
                                </Box>
                              </Button>
                            </div>
                          )}
                          value={startDate}
                        />
                      </LocalizationProvider>
                      <Divider />
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          minDate={startDate}
                          onChange={setEndDate}
                          onClose={() => setEndDatePickerOpen(false)}
                          open={endDatePickerOpen}
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
                                    'MMMM. DD YYYY, dddd',
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
                <Grid item xs={12}>
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
              </Grid>
            </Box>

            <Box>
              <Grid container>
                <Grid item xs={12}>
                  <Card></Card>
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
                  onClick={() => props.setFilterOpen(false)}
                  sx={{
                    borderRadius: {
                      xs: Theme.shape.borderRadius,
                      sm: Theme.shape.borderRadiusLg,
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
