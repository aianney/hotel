import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Theme } from "../../components";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    Typography
} from "@material-ui/core";
import { IoBedOutline, IoChevronBackSharp, IoPeopleOutline } from "react-icons/io5";
import { BsTextareaResize } from "react-icons/bs";

const RoomAmenities = props => {
    const
        centering = {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
        },
        history = useHistory(),
        [amenities, setAmenities] = useState([]),
        id = props.match.params.id,
        getRoomAmenities = () => {
            axios.get(`https://hotelreservations.ph/gpDBProcess/process.php?request=getRateAmenities&rateID=${id}`)
                .then(r => {
                    r.data.state === "Success" ?
                        setAmenities(r.data.data[0]) :
                        console.log(r);
                })
                .catch(e => console.log(e));
        },
        // eslint-disable-next-line
        name = id === 1 ? "Deluxe Sea View" : id === 2 ? "Superior Sea View" : "Standard Room",
        arrangeAmenitiesByLength = () => {
            const arranged = amenities.rateInclusions ? amenities.rateInclusions.sort((a, b) => b.length - a.length) : null;
            console.log(arranged);

            setAmenities({
                ...amenities,
                RateInclusions: {
                    ...arranged
                }
            });
        }

    useEffect(() => {
        getRoomAmenities();
        arrangeAmenitiesByLength();
        // eslint-disable-next-line
    }, []);


    return (
        <>
            <Box mb={4}>
                {amenities && amenities.state === "Error" ?
                    <Box>No Laman</Box> :
                    amenities.rateImages && amenities.rateImages[0] ?
                        <Grid
                            mt={3}
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={1}
                            >
                                <Button onClick={() => history.push("/room-selection")}>
                                    <IoChevronBackSharp size={32} />
                                </Button>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="pageTitle" px={2}>
                                    {amenities.roomName}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} mt={-1} sx={centering}>
                                <Box sx={centering}>
                                    <IoPeopleOutline size={28} />
                                    <Typography variant="roomCardLabel" pl={1} sx={{ textAlign: "center" }}>
                                        {amenities.maxPax} people
                                    </Typography>
                                </Box>
                                <Box sx={centering}>
                                    <IoBedOutline size={28} />
                                    <Typography variant="roomCardLabel" pl={1} sx={{ textAlign: "center" }}>
                                        {amenities.bedsNumber}
                                    </Typography>
                                </Box>
                                <Box sx={centering}>
                                    <BsTextareaResize size={28} />
                                    <Typography variant="roomCardLabel" pl={1} sx={{ textAlign: "center" }}>
                                        {amenities.roomSize}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid items xs={12} pt={5}>
                                <Divider />
                            </Grid>

                            <Grid item xs={12} px={3}>
                                <Typography variant="introSubtitle" px={3}>
                                    {amenities.rateInclusions[0]}.
                                    {` ${amenities.rateInclusions[1]}`}
                                </Typography>
                            </Grid>

                            {/* Pictures */}
                            <Grid
                                item
                                xs={12}

                            >
                                <Grid
                                    container
                                    px={3}
                                    spacing={2}
                                    sx={{
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
                                    }}
                                >

                                    {
                                        amenities.rateImages.map((img, index) =>
                                            <Grid
                                                item
                                                xs={
                                                    amenities.rateImages.length > 1 ?
                                                        11 :
                                                        12
                                                }
                                                md={6}
                                            >
                                                <Box component="img" src={`data:image/png;base64,${img}`} sx={{
                                                    width: "100%",
                                                    height: {
                                                        xs: "250px",
                                                        sm: null
                                                    },
                                                    borderRadius: Theme.shape.borderRadius
                                                }} />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>
                            {/* Pictures */}
                        </Grid>
                        :
                        <Box sx={{
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100vw",
                            height: "100vh",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <CircularProgress />
                        </Box>
                }
            </Box>
        </>
    );
}

export default RoomAmenities;