import React, { useState, useContext } from 'react';
import { AppContext, Filter, Theme } from "../../components";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import image from "../../assets/media/images/Intro/img-1.png";

const Intro = () => {
    const [filterOpen, setFilterOpen] = useState(false);

    const { info, setInfo } = useContext(AppContext);

    return (
        <>
            <Box>
                <Grid
                    container
                    sx={{
                        height: "90vh"
                    }}
                >
                    {/* Left Side of Grid START */}
                    <Grid
                        item
                        xs={12}
                        sm={4}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: {
                                xs: 1,
                                sm: 0,
                            }
                        }}
                    >
                        <Box>
                            <Typography variant="introTitle">
                                Acea
                            </Typography>
                            <Typography variant="introSubtitle">

                            </Typography>

                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        sx={{
                            position: {
                                xs: "fixed",
                                sm: "relative",
                            },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: {
                                xs: "90vh",
                                sm: "auto",
                            },
                        }}
                    >
                        <Box component="img" src={image} sx={{
                            width: {
                                xs: "100%",
                                sm: "70%",
                            },
                            opacity: {
                                xs: .25,
                                sm: 1,
                            }
                        }} />
                    </Grid>
                    {/* Left Side of Grid END */}

                    <Grid

                    >
                    </Grid>
                </Grid>
            </Box>

            <Box p={2}
                sx={{
                    bottom: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                    left: 0,
                    position: "fixed",
                    width: "100vw",
                    zIndex: 2,
                }}
            >
                <Box px={4}>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: Theme.shape.borderRadius,
                        }}>
                        <Box px={2}
                            py={1}
                            sx={{
                                fontWeight: Theme.typography.fontWeightBold,
                                textDecoration: "none",
                                color: "unset",
                            }}
                            onClick={() => setFilterOpen(true)}
                        >
                            Book Now
                        </Box>
                    </Button>
                </Box>
            </Box>

            <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} info={info} setInfo={setInfo} page="intro" text="Book Now" />
        </>
    );
}

export default Intro;

