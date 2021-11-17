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
        bold: 800,
        black: 900,
      },
      style: {
        sansSerif: `"DM Sans", "Heebo", "Montserrat"`,
        serif: `"Poppins", "Source Sans Pro", "Raleway", "PlayFair Display"`,
      },
    },
  },
  filters: {
    language: 'EN',
    currency: 'PHP',
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
    rooms: [],
    totalPayment: 0,
  },
  guestDetails: {
    firstName: '',
    lastName: '',
  },
  payment: {},
}

export default Store
