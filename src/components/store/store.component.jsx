const Store = {
  env: {
    colors: {
      primary: {
        main: '#6dc7b8',
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
      },
    },
  },
  filters: {
    language: 'EN',
    currency: null,
    currencyRate: 1,
    guests: {
      adults: null,
      children: null,
    },
    reservationDates: {
      start: '',
      end: '',
    },
  },
  roomSelection: {
    deluxeSeaView: [],
    superiorSeaView: [],
    standardRoom: [],
  },
  guestDetails: {
    firstName: '',
    lastName: '',
  },
  payment: {},
}

export default Store
