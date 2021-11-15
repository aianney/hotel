import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext, RoomCard, Theme } from "..";
import { Box, Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import {
    BsInfoCircle,
    BsDash,
    BsPlus
} from "react-icons/bs";
import DeluxeSeaViewImage from '../../assets/media/images/deluxe-sea-view.png';


const Room = props => {

    const { info } = useContext(AppContext),
        iconSize = 15;

    return <>
        <Box mb={info.reservationInformation.room.length === props.index + 1 && props.index >= 2 ? 12 : 4}>
            <Grid container spacing={3}>
                <Grid item xs={12} mb={-3} sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%"
                }}>
                    <Box mb={1} mx={3}>
                        <Typography variant="filterLabel" sx={{ textAlign: "end", width: "100%" }}>
                            No. of Rooms:
                        </Typography>
                    </Box>
                </Grid>
                <Grid item px={3} xs={12} sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Box pl={3}>
                        <NavLink sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} to={`/room-selection/${props.index + 1}`}>
                            <Typography variant="roomTypeTitle" mr={2}>
                                {props.information.roomAttributes.roomName}
                            </Typography>
                            <BsInfoCircle size={iconSize} style={{ color: Theme.palette.primary.main }} />
                        </NavLink>
                    </Box>
                    <Box>
                        <ButtonGroup variant="contained">
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => props.removeRoom(props.information.roomType)}
                                disabled={props.rooms && !props.rooms.filter(room => room.id.includes(props.information.roomType)).length ? true : false}
                            >
                                <BsDash size={iconSize} />
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.light.main,
                            }}>
                                {props.rooms.filter(room => room.id.includes(props.information.roomType)).length}
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => props.addRoom(props.index)}
                                disabled={props.information && props.rooms.filter(room => room.id.includes(props.information.roomType)).length >= info.reservationInformation.room[props.index].available ? true : false}
                            >
                                <BsPlus />
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Grid container px={3} spacing={2} sx={{
                        display: {
                            xs: "iflex",
                            md: "",
                        },
                        overflowX: {
                            xs: "scroll",
                            md: "auto",
                        },
                        flexWrap: {
                            xs: "nowrap",
                            md: "wrap",
                        }
                    }}>
                        {!props.rooms.filter(e => e.id.includes(props.information.roomType)).length ?
                            <RoomCard
                                disabled={true}
                                img={DeluxeSeaViewImage}
                                setRooms={e => props.setRooms(e)}
                                id={props.index} /> :
                            props.rooms
                                .filter(e => e.id.includes(props.information.roomType))
                                .map((data, index) =>
                                    <RoomCard
                                        key={data.id}
                                        img={DeluxeSeaViewImage}
                                        roomType={props.information.roomType}
                                        index={index}
                                        roomId={data.id}
                                        data={data}
                                        rooms={props.rooms}
                                        setRooms={e => props.setRooms(e)}
                                        count={props.rooms.filter(e => e.id.includes(props.information.roomType)).length}
                                        id={props.index}
                                    />
                                )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </>;
}

export default Room;
