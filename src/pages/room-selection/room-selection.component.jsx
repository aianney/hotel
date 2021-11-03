import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import {
  PageStepper,
  RoomCard,
  Theme,
} from '../../components/components.component'

import {
  AiOutlineCalendar,
  AiOutlineInfoCircle,
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai'
import { BsCalendar4Event, BsCalendar4Range } from 'react-icons/bs'
import moment from 'moment'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import DateFnsUtils from '@date-io/date-fns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const RoomSelection = () => {
  const iconSize = 22,
    defaults = {
      children: {
        max: 2,
        min: 0,
      },
      adults: {
        max: 2,
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
    }

  const [adults, setAdults] = useState(1),
    [children, setChildren] = useState(0)

  const [startDate, setStartDate] = useState(new Date()),
    [startDatePickerOpen, setStartDatePickerOpen] = useState(false),
    [endDate, setEndDate] = useState(new Date()),
    [endDatePickerOpen, setEndDatePickerOpen] = useState(false)

  const [filterOpen, setFilterOpen] = useState(false)

  const [superiorSeaView, setSuperiorSeaView] = useState([defaults.room])

  return (
    <>
      <Box p={4} sx={{ overflow: 'hidden' }}>
        <Box my={4}>
          <PageStepper activeStep={0} />
        </Box>
        <Grid container>
          <Grid
            item
            xs={8}
            md={6}
            sx={{
              display: 'block',
            }}
          >
            <Box>
              <Typography variant="pageTitle">Select Rooms</Typography>
            </Box>
            <Box>
              <Typography variant="pageSubtitle">
                Select how many rooms you will use while staying.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
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
        <Grid container mt={3} spacing={3}>
          <Grid
            item
            xl={12}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
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
                  backgroundColor: Theme.palette.light.light,
                }}
                onClick={() =>
                  setSuperiorSeaView(
                    superiorSeaView.filter(
                      (room, index) => index !== superiorSeaView.length - 1,
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
                  backgroundColor: Theme.palette.light.light,
                }}
                onClick={() =>
                  setSuperiorSeaView((ssv) => [...ssv, defaults.room])
                }
              >
                <AiOutlinePlus />
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid
            item
            sx={{
              width: '100%',
            }}
          >
            <Grid
              container
              xs={12}
              sx={{
                display: {
                  xs: 'inline-flex',
                  sm: 'block',
                },
                overflow: {
                  xs: 'scroll',
                  sm: 'auto',
                },
                flexWrap: 'nowrap',
                width: '100%',
              }}
              spacing={3}
            >
              {superiorSeaView.length === 0 ? (
                <RoomCard disabled={true} />
              ) : (
                superiorSeaView.map((data, index) => (
                  <RoomCard
                    key={'SSV-' + index}
                    count={superiorSeaView.length}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {filterOpen ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            backdropFilter: 'blur(7.5px)',
            zIndex: 100,
            backgroundColor: 'rgba(0,0,0,.75)',
          }}
        >
          <Card
            sx={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: Theme.palette.light.light,
            }}
          >
            <Box pt={5} pb={2} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      backgroundColor: Theme.palette.light.main,
                      width: '100%',
                    }}
                  >
                    <Box mt={3} ml={3}>
                      <Typography variant="filterLabel">
                        Reservation Dates
                      </Typography>
                    </Box>
                    <Box px={3}>
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          open={startDatePickerOpen}
                          onClose={() => setStartDatePickerOpen(false)}
                          value={startDate}
                          minDate={new Date()}
                          maxDate={endDate}
                          onChange={setStartDate}
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
                                style={{ display: 'none' }}
                                value={value}
                                onChange={onChange}
                                disabled={disabled}
                                {...inputProps}
                              />
                              <Button
                                sx={Theme.typography.filterText}
                                onClick={() =>
                                  setStartDatePickerOpen(
                                    (startDatePickerOpen) =>
                                      !startDatePickerOpen,
                                  )
                                }
                              >
                                <Box
                                  py={3}
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '77.5vw',
                                  }}
                                >
                                  <BsCalendar4Event size={iconSize} />

                                  {moment(startDate).format('MMM. DD, ddd.')}
                                </Box>
                              </Button>
                            </div>
                          )}
                        />
                      </LocalizationProvider>
                      <Divider />
                      <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <MobileDatePicker
                          sx={{
                            backgroundColor: 'pink',
                          }}
                          open={endDatePickerOpen}
                          onClose={() => setEndDatePickerOpen(false)}
                          value={startDate}
                          minDate={startDate}
                          onChange={setEndDate}
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
                                style={{ display: 'none' }}
                                value={value}
                                onChange={onChange}
                                miDate={startDate}
                                disabled={disabled}
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
                                    width: '77.5vw',
                                  }}
                                >
                                  <BsCalendar4Range size={iconSize} />

                                  {moment(endDate).format('MMM. DD, ddd.')}
                                </Box>
                              </Button>
                            </div>
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Card>
                </Grid>

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
                        py={3}
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
                            sx={{
                              backgroundColor: Theme.palette.light.light,
                            }}
                            disabled={
                              adults === defaults.adults.min ? true : false
                            }
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
                              backgroundColor: Theme.palette.light.light,
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
                        py={3}
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
                              backgroundColor: Theme.palette.light.light,
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
                              backgroundColor: Theme.palette.light.light,
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

                <Box
                  pt={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => setFilterOpen(false)}
                  >
                    Close
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Card>
        </Box>
      ) : (
        <></>
      )}

      <Box
        p={2}
        sx={{
          backgroundColor: Theme.palette.light.light,
          bottom: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          left: 0,
          position: 'fixed',
          width: '100vw',
        }}
      >
        <Box px={3}>
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
