import React, { useContext } from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { AppContext, Theme } from "..";
import { BsDashCircleFill } from 'react-icons/bs';
import moment from "moment";

const PriceBreakDownContent = () => {

    const
        { info, setInfo } = useContext(AppContext),
        alignCenter = { display: 'flex', alignItems: 'center' },
        dateDifference = moment
            .duration(
                moment(info.filters.reservationDates.end).diff(
                    moment(info.filters.reservationDates.start),
                ),
            )
            .asDays(),
        removeRoomType = roomType => {
            const
                roomRemoved = info.roomSelection.rooms.length ?
                    info.roomSelection.rooms.map(room => !room.id.includes(roomType) ?
                        room : null).filter(room => room) : [],
                updates = {
                    ...info,
                    roomSelection: {
                        ...info.roomSelection,
                        rooms: roomRemoved,
                        totalPayment: roomRemoved.length ? roomRemoved
                            .map(room => !room.id.includes(roomType) ?
                                room.price + (room.addOns.length ? room.addOns.map(addOn => addOn.price * addOn.count).reduce((a, b) => a + b) : 0)
                                : 0).reduce((a, b) => a + b) : 0,
                    }
                };

            setInfo(updates);
            console.log(roomRemoved);
        };

    return <>
        {
            info.reservationInformation &&
                info.reservationInformation.room ? (
                info.reservationInformation.room.map((room) =>
                    info.roomSelection.rooms.filter(e =>
                        e.id.includes(room.roomType),
                    ).length ? (
                        <Grid container>
                            <Grid item xs={12} sx={{ ...alignCenter, justifyContent: "space-between" }}>
                                <Typography
                                    variant="priceBreakdownTitle"
                                    sx={{ fontWeight: Theme.typography.bold }}
                                >
                                    {room.roomAttributes.roomName}
                                </Typography>
                                <IconButton
                                    color="error"
                                    sx={{ width: 'auto' }}
                                    onClick={() =>
                                        removeRoomType(room.roomType)
                                    }
                                >
                                    <BsDashCircleFill />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} mb={1}>
                                <Grid container>
                                    {
                                        info.roomSelection.rooms.filter(x =>
                                            x.id.includes(room.roomType),
                                        ).map((x, i) => <>
                                            <Grid item xs={12}>
                                                <Box px={1} sx={{ ...alignCenter, justifyContent: "space-between", }}>
                                                    <Box>
                                                        <Typography
                                                            variant="priceBreakdownTitle"
                                                            sx={{ fontSize: 16 }}
                                                        >
                                                            {`${room.roomAttributes.roomName} ${i + 1}`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            {/*Room Rate START */}
                                            <Grid item xs={12}>
                                                <Box pl={2} sx={{ ...alignCenter, justifyContent: "space-between" }}>
                                                    <Box>
                                                        <Typography
                                                            variant="priceBreakdownTitle"
                                                            sx={{ fontStyle: "italic", fontSize: 16, fontWeight: 500 }}
                                                        >
                                                            {x.rate}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography
                                                            variant="priceBreakdownTitle"
                                                            sx={{ fontStyle: "italic", fontSize: 16, fontWeight: 500 }}
                                                        >
                                                            {`${info.filters.currency}
                                                            ${(x.price *
                                                                    info.filters.currencyRate * dateDifference)
                                                                    .toLocaleString(undefined, {
                                                                        minimumFractionDigits: 2,
                                                                        maximumFractionDigits: 2,
                                                                    })}`
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            {/*Room Rate END */}

                                            {/* Show AddOns Label START */}
                                            {
                                                x.addOns.length &&
                                                    x.addOns
                                                        .map(addOn => addOn.count)
                                                        .reduce((a, b) => a + b) ?
                                                    <Grid item xs={12} sx={{ ...alignCenter }}>
                                                        <Box pl={2} sx={{ width: "50%" }}>
                                                            <Typography
                                                                variant="priceBreakdownTitle"
                                                                sx={{ fontStyle: "italic", fontSize: 14, fontWeight: 500, wordWrap: "break-word" }}
                                                            >
                                                                Add Ons:
                                                            </Typography>
                                                        </Box>
                                                    </Grid> : <></>
                                            }
                                            {/* Show AddOns Label END */}

                                            {/* AddOns START */}
                                            {
                                                x.addOns.length ?
                                                    x.addOns.map((addOn, index) =>
                                                        addOn.count ?
                                                            <Grid item xs={12}>
                                                                <Box pl={3} sx={{ ...alignCenter, justifyContent: "space-between" }}>
                                                                    <Box sx={{ width: "50%" }}>
                                                                        <Typography
                                                                            variant="priceBreakdownTitle"
                                                                            sx={{ fontStyle: "italic", fontSize: 14, fontWeight: 500, wordWrap: "break-word" }}
                                                                        >
                                                                            {`${addOn.count ? `(${addOn.count})` : ""} ${addOn.description}`}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box>
                                                                        <Typography
                                                                            variant="priceBreakdownTitle"
                                                                            sx={{ fontStyle: "italic", fontSize: 14, fontWeight: 500 }}
                                                                        >
                                                                            {`${info.filters.currency} 
                                                                            ${((addOn.price * addOn.count) *
                                                                                    info.filters.currencyRate *
                                                                                    dateDifference)
                                                                                    .toLocaleString(undefined, {
                                                                                        minimumFractionDigits: 2,
                                                                                        maximumFractionDigits: 2,
                                                                                    })}`}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                            </Grid> : <></>

                                                    ) : <> </>
                                            }
                                            {/* AddOns END */}

                                            {/* Subtotal per Room START */}
                                            <Grid item xs={12} mt={1} mb={2} sx={{ ...alignCenter, justifyContent: "flex-end" }}>
                                                <Box>
                                                    <Typography
                                                        variant="priceBreakdownTitle"
                                                        sx={{ fontSize: 16, wordWrap: "break-word" }}
                                                    >
                                                        {`Subtotal for 
                                                        ${room.roomType} 
                                                        ${i + 1}: 
                                                        ${info.filters.currency} 
                                                        ${((x.price +
                                                                x.addOns.map(addOn =>
                                                                    addOn.count * addOn.price)
                                                                    .reduce((a, b) => a + b)) *
                                                                info.filters.currencyRate *
                                                                dateDifference)
                                                                .toLocaleString(undefined, {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                })}`}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            {/* Subtotal per Room END */}
                                        </>
                                        )
                                    }
                                </Grid>
                                {/* Subtotal per Room START */}
                                <Grid item xs={12} mb={2}>
                                    <Box sx={{ ...alignCenter, justifyContent: "flex-end" }}>
                                        <Typography
                                            variant="priceBreakdownTitle"
                                            sx={{ fontSize: 16, textAlign: "center" }}
                                        >
                                            {`Subtotal for ${room.roomAttributes.roomName}: `}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ ...alignCenter, justifyContent: "flex-end" }}>
                                        <Typography variant="priceBreakdownTotal"
                                            sx={{ fontSize: 20, textAlign: "center" }}
                                        >
                                            {`
                                        
                                        ${info.filters.currency} ${(
                                                    info.roomSelection.rooms
                                                        .filter((e) => e.id.includes(room.roomType))
                                                        .map(
                                                            (e) =>
                                                                e.price +
                                                                (e.addOns
                                                                    ? e.addOns
                                                                        .map(
                                                                            (addOn) =>
                                                                                addOn.count * addOn.price,
                                                                        )
                                                                        .reduce((a, b) => a + b)
                                                                    : 0),
                                                        )
                                                        .reduce((a, b) => a + b, 0) *
                                                    info.filters.currencyRate *
                                                    dateDifference)
                                                    .toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}`}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Divider />
                                {/* Subtotal per Room END */}
                            </Grid>
                        </Grid>
                    ) : (
                        <> </>
                    ),
                )
            ) : (
                <></>
            )
        }
    </>
}

export default PriceBreakDownContent;