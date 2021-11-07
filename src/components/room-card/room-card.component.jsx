import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
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
// import { intlFormat } from 'date-fns'

const RoomCard = (props) => {
  const iconSize = 10,
    // eslint-disable-next-line
    { info, setInfo } = useContext(AppContext),
    [showAddOns, setShowAddOns] = useState(false),
    [rate, setRate] = useState(''),
    [children, setChildren] = useState(
      info.reservationInformation &&
        info.filters.guests.children >
          info.reservationInformation.room[props.id].RoomAttributes.maxChild
        ? info.reservationInformation.room[props.id].RoomAttributes.maxChild
        : info.filters && info.filters.guests.children
        ? info.filters.guests.children
        : 0,
    ),
    [adults, setAdults] = useState(
      info.reservationInformation &&
        info.filters.guests.adults >
          info.reservationInformation.room[props.id].RoomAttributes.maxPax
        ? info.reservationInformation.room[props.id].RoomAttributes.maxPax
        : info.filters && info.filters.guests.adults
        ? info.filters.guests.adults
        : 1,
    ),
    cardInfo = [
      {
        icon: <IoPeopleOutline />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].RoomAttributes.maxPax +
            info.reservationInformation.room[props.id].RoomAttributes.maxPax +
            ' people'
          : null,
      },
      {
        icon: <IoBedOutline />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].RoomAttributes.BedsNumber
          : null,
      },
      {
        icon: <BsTextareaResize />,
        label: info.reservationInformation
          ? info.reservationInformation.room[props.id].RoomAttributes.RoomSize
          : null,
      },
    ]

  useEffect(() => {})

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
                  width: {
                    xs: '100%',
                    sm: '225px',
                  },
                  position: 'relative',
                  height: { sm: '100%' },
                  maxHeight: {
                    sm: '350px',
                  },
                  borderRadius: Theme.shape.borderRadius,
                  overflow: { sm: 'hidden' },
                }}
              >
                <Box
                  component="img"
                  src={props.img}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    height: { sm: '100%' },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={8} sx={{}}>
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
                  <Grid
                    item
                    xs={4}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Chip
                      label={
                        '₱ ' +
                        (info.reservationInformation
                          ? info.reservationInformation.room[props.id]
                              .RoomRates[0][4]
                          : 1000)
                      }
                      sx={{
                        backgroundColor: Theme.palette.secondary.main,
                        color: 'white',
                        fontWeight: Theme.typography.fontWeightBold,
                        borderRadius: Theme.shape.borderRadiusSm,
                      }}
                    />
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
                              disabled={adults === 0 ? true : false}
                              // eslint-disable-next-line
                              disabled={
                                info.reservationInformation &&
                                adults ===
                                  info.reservationInformation.room[props.id]
                                    .RoomAttributes.maxPax
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                adults === 0
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
                              onClick={() =>
                                info.reservationInformation.room &&
                                adults ===
                                  info.reservationInformation.room[props.id]
                                    .RoomAttributes.maxPax
                                  ? ''
                                  : setAdults((adults) => adults + 1)
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
                                children === 0
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
                                info.reservationInformation &&
                                children ===
                                  info.reservationInformation.room[props.id]
                                    .RoomAttributes.maxChild
                                  ? true
                                  : false
                              }
                              onClick={() =>
                                info.reservationInformation.room &&
                                children ===
                                  info.reservationInformation.room[props.id]
                                    .RoomAttributes.maxChild
                                  ? ''
                                  : setChildren((children) => children + 1)
                              }
                            >
                              {console.log(info)}
                              <AiOutlinePlus size={iconSize} />
                            </Button>
                          </ButtonGroup>
                        </Grid>
                        {/* Children Tab END */}
                      </Grid>
                    </Card>
                  </Grid>

                  <Grid item py={0} my={0} xs={12}>
                    <Collapse in={showAddOns}>
                      <Box>Testing</Box>
                    </Collapse>
                  </Grid>

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
                backgroundColor: 'rgba(255,255,255,.75)',
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
