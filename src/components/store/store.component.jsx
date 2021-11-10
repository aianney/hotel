const Store = {
    env: {
        colors: {
            primary: {
                main: "#6dc7b8",
            },
        },
        fonts: {
            weight: {
                light: 300,
                regular: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                black: 800,
            },
            style: {
                sansSerif: `"DM Sans", "Heebo", "Montserrat"`,
                serif: `"Poppins", "Source Sans Pro", "Raleway", "PlayFair Display"`,
            }
        },
    },
    filters: {
        language: "EN",
        currency: "PHP",
        guests: {
            adults: null,
            children: null,
        },
        reservationDates: {
            start: null,
            end: null,
        },
    },
    roomSelection: {
        deluxeSeaView: [],
        superiorSeaView: [],
        standardRoom: [],
    },
    guestDetails: {

    },
    payment: {

    },
    prices: [
        {
            name: "",
            quantity: 1,
            value: 1000,
        }
    ],
}

export default Store;