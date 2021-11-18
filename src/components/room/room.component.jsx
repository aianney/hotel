import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext, RoomCard, Theme } from '..'
import { Box, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'
import { BsInfoCircle, BsDash, BsPlus } from 'react-icons/bs'
import DeluxeSeaViewImage from '../../assets/media/images/deluxe-sea-view.png'

const Room = (props) => {
  const { info, setInfo } = useContext(AppContext),
    defaults = {
      room: {
        adults: info.filters.guests.adults,
        children: info.filters.guests.children,
        addOns: info.reservationInformation
          ? info.reservationInformation.addOnList
            .map((addOn) => {
              const addOnTemplate = {
                id: addOn.id,
                description: addOn.descr,
                price: parseInt(addOn.price),
                count: 0,
              }
              return addOnTemplate
            })
            .sort()
          : null,
      },
    },
    addRoom = (index) => {
      const newRoom = {
        ...defaults.room,
        id: info.reservationInformation
          ? `${info.roomSelection.rooms.length}-${info.reservationInformation.room[index].roomType}`
          : null,
        price: info.reservationInformation
          ? info.reservationInformation.room[index].roomRates
            .filter((e) => e[3])
            .map((e) => parseFloat(e[4]))
            .reduce((a, b) => a + b)
          : 0,
        rate: info.reservationInformation
          ? info.reservationInformation.room[index].roomRates[0][3]
          : 0,
      },
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: [...info.roomSelection.rooms, newRoom],
            totalPayment: info.roomSelection.totalPayment + newRoom.price,
          },
        }
      setInfo(updates)
    },
    removeRoom = (index) => {
      const roomRemoved = info.roomSelection.rooms.length
        ? info.roomSelection.rooms
          .map((room, i) => (i === index ? null : room))
          .filter((e) => e)
        : [],
        updates = {
          ...info,
          roomSelection: {
            ...info.roomSelection,
            rooms: roomRemoved,
            totalPayment:
              info.roomSelection.totalPayment -
              (info.roomSelection.rooms.length
                ? info.roomSelection.rooms
                  .map((room, i) =>
                    i === index
                      ? room.price +
                      (room.addOns.length
                        ? room.addOns
                          .map((addOn) => addOn.count * addOn.price)
                          .reduce((a, b) => a + b)
                        : 0)
                      : 0,
                  )
                  .reduce((a, b) => a + b)
                : 0),
          },
        }

      setInfo(updates)
    },
    iconSize = 15

  return (
    <>
      <Box
        mb={info.reservationInformation &&
          info.reservationInformation.room.length === props.index + 1 ?
          16 :
          4}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            mb={-3}
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Box mb={1} mx={3}>
              <Typography
                variant="filterLabel"
                sx={{ textAlign: 'end', width: '100%' }}
              >
                No. of Rooms:
              </Typography>
            </Box>
          </Grid>
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
            <Box pl={3}>
              <NavLink
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                to={`/room-selection/${props.information.roomRates.length ? props.information.roomRates[0][6] : 0}`}
              >
                <Typography variant="roomTypeTitle" mr={2}>
                  {props.information.roomAttributes.roomName}
                </Typography>
                <BsInfoCircle
                  size={iconSize}
                  style={{ color: Theme.palette.primary.main }}
                />
              </NavLink>
            </Box>
            <Box>
              <ButtonGroup variant="contained">
                <Button
                  sx={{
                    backgroundColor: Theme.palette.background.light,
                  }}
                  onClick={() =>
                    removeRoom(
                      info.roomSelection.rooms.length
                        ? info.roomSelection.rooms
                          .map((room, index) =>
                            room.id.includes(
                              props.information
                                ? props.information.roomType
                                : '',
                            )
                              ? index
                              : null,
                          )
                          .filter((room) => room != null)
                          .at(-1)
                        : '',
                    )
                  }
                  disabled={
                    info.roomSelection.rooms.length &&
                    !info.roomSelection.rooms.filter((room) =>
                      room.id.includes(props.information.roomType),
                    ).length
                  }
                >
                  <BsDash size={iconSize} />
                </Button>
                <Button
                  sx={{
                    backgroundColor: Theme.palette.light.main,
                  }}
                >
                  {info.roomSelection.rooms && info.roomSelection.rooms.length
                    ? info.roomSelection.rooms.filter((room) =>
                      room.id.includes(props.information.roomType),
                    ).length
                    : 0}
                </Button>
                <Button
                  sx={{
                    backgroundColor: Theme.palette.background.light,
                  }}
                  onClick={() => addRoom(props.index)}
                  disabled={
                    props.information &&
                      info.roomSelection.rooms.length &&
                      info.roomSelection.rooms.filter((room) =>
                        room.id.includes('DSV'),
                      ).length >=
                      info.reservationInformation.room[props.index].available
                      ? true
                      : false
                  }
                >
                  <BsPlus />
                </Button>
              </ButtonGroup>
            </Box>
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
              {!info.roomSelection.rooms.filter((room) =>
                room.id.includes(props.information.roomType),
              ).length ? (
                <RoomCard
                  disabled={true}
                  img={DeluxeSeaViewImage}
                  information={props.information}
                  id={props.index}
                />
              ) : (
                info.roomSelection.rooms
                  .filter((room) =>
                    room.id.includes(props.information.roomType),
                  )
                  .map((data, index) => (
                    <RoomCard
                      key={data.id}
                      img={DeluxeSeaViewImage}
                      roomType={props.information.roomType}
                      information={props.information}
                      index={index}
                      roomId={data.id}
                      data={data}
                      count={
                        info.roomSelection.rooms.filter((e) =>
                          e.id.includes(props.information.roomType),
                        ).length
                      }
                      id={props.index}
                    />
                  ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Room
