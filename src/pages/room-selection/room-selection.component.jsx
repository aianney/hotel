import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Typography
} from "@material-ui/core";
import {
    AppContext,
    CustomButton,
    Filter,
    PageStepper,
    PriceBreakdown,
    RoomCard,
    Theme,
} from "../../components";
import {
    AiOutlineCalendar,
    AiOutlineInfoCircle,
    AiOutlineMinus,
    AiOutlinePlus
} from 'react-icons/ai';
import StandardRoomImage from '../../assets/media/images/standard-room.png';
import SuperiorSeaViewImage from '../../assets/media/images/superior-sea-view.png';
import DeluxeSeaViewImage from '../../assets/media/images/deluxe-sea-view.png';

const RoomSelection = () => {

    const
        { info, setInfo } = useContext(AppContext),
        iconSize = 22,
        defaults = {
            room: {
                adults: info.filters.guests.adults,
                children: info.filters.guests.children,
                addOns: {
                    adults: 0,
                    children: 0,
                },
                rate: "",
                price: 1000,
            },
        }, history = useHistory(),
        [filterOpen, setFilterOpen] = useState(false),
        [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false),
        // eslint-disable-next-line
        [dateChange, setDateChange] = useState(false),

        [deluxeSeaView, setDeluxeSeaView] = useState(info.roomSelection.deluxeSeaView),
        [superiorSeaView, setSuperiorSeaView] = useState(info.roomSelection.superiorSeaView),
        [standardRoom, setStandardRoom] = useState(info.roomSelection.standardRoom),
        [totalPayment, setTotalPayment] = useState(0),

        // Function to go back to Intro Page if no data has been set START
        backToIntro = () => {
            if (info.filters.reservationDates.start === null || info.filters.reservationDates.end === null) {
                history.push("/");
            }
        },
        // Function to go back to Intro Page if no data has been set END

        // Functions for Deluxe Sea View START
        addDSVRoom = () => {
            setDeluxeSeaView(dsv =>
                [
                    ...dsv,
                    {
                        ...defaults.room,
                        id: "DSV-" + deluxeSeaView.length,
                        price: parseFloat(info.reservationInformation.room[0].roomRates[0][4]),
                        rate: info.reservationInformation.room[0].roomRates[0][3],
                    }
                ]);
            setTotalPayment(totalPayment + parseFloat(info.reservationInformation.room[0].roomRates[0][4]));
        },
        removeDSVRoom = () => {
            setDeluxeSeaView(deluxeSeaView.filter((r, index) =>
                index !== deluxeSeaView.length - 1
            ));
            setTotalPayment(totalPayment - parseFloat(info.reservationInformation.room[0].roomRates[0][4]));
        },
        // FUnctions for Deluxe Sea View END

        // Functions for Superior Sea View START
        addSSVRoom = () => {
            setSuperiorSeaView(ssv => [
                ...ssv,
                {
                    ...defaults.room,
                    id: "SSV-" + superiorSeaView.length,
                    price: parseFloat(info.reservationInformation.room[1].roomRates[0][4]),
                    rate: info.reservationInformation.room[1].roomRates[0][3],
                }
            ]);
            setTotalPayment(totalPayment + parseFloat(info.reservationInformation.room[1].roomRates[0][4]));
        },
        removeSSVRoom = () => {
            setSuperiorSeaView(superiorSeaView.filter((r, index) =>
                index !== superiorSeaView.length - 1
            ));
        },
        // Functions for Superior Sea View END

        // Functions for Standard Room START
        addSTDRoom = () => {
            setStandardRoom(std => [
                ...std,
                {
                    ...defaults.room,
                    id: "SSV-" + standardRoom.length,
                    price: parseFloat(info.reservationInformation.room[2].roomRates[0][4]),
                    rate: info.reservationInformation.room[2].roomRates[0][3],
                }
            ])
            setTotalPayment(totalPayment + parseFloat(info.reservationInformation.room[2].roomRates[0][4]));
        },
        removeSTDRoom = () => {
            setStandardRoom(standardRoom.filter((r, index) =>
                index !== standardRoom.length - 1
            ));
            setTotalPayment(totalPayment - parseFloat(info.reservationInformation.room[2].roomRates[0][4]));
        };
    // Functions for Standard Room END

    useEffect(() => {
        backToIntro();
        setTotalPayment(totalPayment < 0 ? 0 : totalPayment);

        setInfo({
            ...info,
            roomSelection: {
                ...info.roomSelection,
                deluxeSeaView: deluxeSeaView,
                superiorSeaView: superiorSeaView,
                standardRoom: standardRoom,
                totalPayment: totalPayment,
            }
        });
    
// eslint-disable-next-line
    }, [deluxeSeaView, superiorSeaView, standardRoom]);

    return (
        <>
            <Box px={4}>
                <Box my={4}>
                    <PageStepper activeStep={0} />
                </Box>
                <Grid container>
                    <Grid
                        item
                        xs={10}
                        md={6}
                        sx={{
                            display: "block"
                        }} >
                        <Box>
                            <Typography variant="pageTitle">
                                Select Rooms
                            </Typography>
                        </Box>
                        <Box mb={3}>
                            <Typography variant="pageSubtitle">
                                Select how many rooms you will use while staying.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item
                        xs={2}
                        md={6}
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none"
                            },
                            justifyContent: "flex-end"
                        }}>
                        <Button onClick={() => setFilterOpen(filterOpen => !filterOpen)} p={0}>
                            <AiOutlineCalendar size={iconSize} />
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Deluxe Sea View Selection START */}
            <Box mb={4}>
                <Grid container spacing={3}>
                    <Grid item px={3} xs={12} sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    }}>
                        <Box pl={3} sx={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant="roomTypeTitle">
                                Deluxe Sea View
                            </Typography>
                            <Button sx={{
                                padding: 0,
                                margin: 0,
                            }}
                                onClick={() => history.push("/room-selection/1")}>
                                <AiOutlineInfoCircle size={iconSize} />
                            </Button>
                        </Box>

                        <ButtonGroup variant="contained">
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => removeDSVRoom()}
                                disabled={deluxeSeaView.length === 0 ? true : false}>
                                <AiOutlineMinus size={iconSize} />
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.light.main,
                            }}>
                                {deluxeSeaView.length}
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => addDSVRoom()}
                                disabled={info.reservationInformation && deluxeSeaView.length >= info.reservationInformation.room[0].available ? true : false}>
                                <AiOutlinePlus />
                            </Button>
                        </ButtonGroup>
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
                            {deluxeSeaView.length === 0 ?
                                <RoomCard disabled={true} img={DeluxeSeaViewImage} id={0} /> :
                                deluxeSeaView.map((data, index) => <RoomCard key={"DSV-" + (index)} img={DeluxeSeaViewImage} index={index} data={data} roomType={deluxeSeaView} count={deluxeSeaView.length} id={0} />
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* Deluxe Sea View Selection END */}

            {/* Superior Sea View Selection START */}
            <Box mb={4}>
                <Grid container spacing={3}>
                    <Grid item px={3} xs={12} sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    }}>
                        <Box pl={3} sx={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant="roomTypeTitle">
                                Superior Sea View
                            </Typography>
                            <Button sx={{
                                padding: 0,
                                margin: 0,
                            }}
                                onClick={() => history.push("/room-selection/2")}>
                                <AiOutlineInfoCircle size={iconSize} />
                            </Button>
                        </Box>

                        <ButtonGroup variant="contained">
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => removeSSVRoom()}
                                disabled={superiorSeaView.length === 0 ? true : false}>
                                <AiOutlineMinus size={iconSize} />
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.light.main,
                            }}>
                                {superiorSeaView.length}
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => addSSVRoom()}
                                disabled={info.reservationInformation && superiorSeaView.length >= info.reservationInformation.room[1].available ? true : false}>
                                <AiOutlinePlus />
                            </Button>
                        </ButtonGroup>
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
                            {superiorSeaView.length === 0 ?
                                <RoomCard disabled={true} img={SuperiorSeaViewImage} id={1} /> :
                                superiorSeaView.map((data, index) =>
                                    <RoomCard key={"SSV-" + (index)} img={SuperiorSeaViewImage} index={index} data={data} roomType={superiorSeaView} count={superiorSeaView.length} id={1} />
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* Superior Sea View Selection END */}

            {/* Standard Room Selection START */}
            <Box mb={12}>
                <Grid container spacing={3}>
                    <Grid item px={3} xs={12} sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%"
                    }}>
                        <Box pl={3} sx={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Typography variant="roomTypeTitle">
                                Standard Room
                            </Typography>
                            <Button sx={{
                                padding: 0,
                                margin: 0,
                            }}
                                onClick={() => history.push("/room-selection/1")}>
                                <AiOutlineInfoCircle size={iconSize} />
                            </Button>
                        </Box>

                        <ButtonGroup variant="contained">
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => removeSTDRoom()}
                                disabled={standardRoom.length === 0 ? true : false}>
                                <AiOutlineMinus size={iconSize} />
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.light.main,
                            }}>
                                {standardRoom.length}
                            </Button>
                            <Button sx={{
                                backgroundColor: Theme.palette.background.light
                            }}
                                onClick={() => addSTDRoom()}
                                disabled={info.reservationInformation && standardRoom.length >= info.reservationInformation.room[2].available ? true : false}>
                                <AiOutlinePlus />
                            </Button>
                        </ButtonGroup>
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
                            {standardRoom.length === 0 ?
                                <RoomCard disabled={true} img={StandardRoomImage} id={2} /> :
                                standardRoom.map((data, index) =>
                                    <RoomCard key={"STD-" + (index)} img={StandardRoomImage} index={index} data={data} roomType={standardRoom} count={standardRoom.length} id={2} />
                                )}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            {/* Standard Room Selection END */}

            {/* Filter START */}
            <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} setDateChange={setDateChange} text="Apply Now" />
            {/* Filter END */}

            {/* Price Breakdown START */}
            <PriceBreakdown priceBreakdownOpen={priceBreakdownOpen} setPriceBreakdownOpen={setPriceBreakdownOpen} />
            {/* Price Breakdown END */}

            {/* Action Button START */}
            <CustomButton onClick={() => history.push("/guest-details")} disabled={info.roomSelection.deluxeSeaView.length || info.roomSelection.superiorSeaView.length || info.roomSelection.standardRoom.length ? false : true}>
                Proceed
            </CustomButton>
            {/* Action Button END */}

            <Box p={2} sx={{ position: "fixed", bottom: 0, left: 0, zIndex: 201 }}>
                <Button onClick={() => setPriceBreakdownOpen(priceBreakdownOpen => !priceBreakdownOpen)}
                    sx={{
                        borderRadius: Theme.shape.borderRadius,
                    }}
                >
                    <Box px={2}
                        py={1}
                        sx={{
                            fontWeight: Theme.typography.fontWeightBold,
                            textDecoration: "none",
                            color: "unset",
                        }}
                    >
                        Price Breakdown
                    </Box>
                </Button>
            </Box>

        </>
    );
}

export default RoomSelection;