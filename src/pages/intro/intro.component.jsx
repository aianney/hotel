import React, { useState } from 'react'
import { Theme } from '../../components/components.component'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
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

const Intro = () => {
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

  return (
    <>
      <Box
        sx={{
          background:
            "url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Acea_Subic_Bay.jpg/2560px-Acea_Subic_Bay.jpg')",
          backgroundSize: 'cover',
          height: '100vh',
          margin: 'auto',
          position: 'fixed',
          width: '100vw',
        }}
      ></Box>

      <Grid
        p={2}
        sx={{
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          width: '100vw',
        }}
      >
        <Card
          sx={{
            backgroundColor: 'rgba(255, 255, 255, .9)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Box py={4} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h4">Welcome to Acea</Typography>
                </Box>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Card
                  sx={{
                    backgroundColor: Theme.palette.light.light,
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
                        onClose={() => setStartDatePickerOpen(false)}
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
                              value={value}
                              style={{ display: 'none' }}
                              {...inputProps}
                            />
                            <Button
                              onClick={() =>
                                setStartDatePickerOpen(
                                  (startDatePickerOpen) => !startDatePickerOpen,
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

                                {moment(startDate).format('MMM. DD, ddd.')}
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
                              style={{ display: 'none' }}
                              value={value}
                              onChange={onChange}
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
                                  width: '100%',
                                }}
                              >
                                <BsCalendar4Range size={iconSize} />

                                {moment(endDate).format('MMM. DD, ddd.')}
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

              {/* Guests Per Room START */}
              <Grid item sm={6} xs={12}>
                <Card
                  sx={{
                    backgroundColor: Theme.palette.light.light,
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
            </Grid>
          </Box>
          <Box
            mx={3}
            mb={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-End',
            }}
          >
            <Box>
              <NavLink to="/room-selection">
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
                    Book Now
                  </Box>
                </Button>
              </NavLink>
            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  )
}

export default Intro
