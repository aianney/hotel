import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import Store from "../store/store.component";
let Theme = createTheme({
    palette: {
        background: {
            light: `#ffffff`,
            default: `#fafafa`,
        },
        primary: {
            ...Store.env.colors.primary
        },
        secondary: {
            light: `#d58048`,
            main: `#A95B27`,
            dark: `#6b3a19`
        },
        light: {
            light: `#fff`,
            main: `#fafafa`,
        }
    },
    shadows: [`none`],
    shape: {
        borderRadius: `1em`,
        borderRadiusLg: `2em`,
        borderRadiusSm: `.5em`,
    },
    cardSelect: {
        backgroundColor: `#fafafa`,
        fontWeight: Store.env.fonts.weight.bold,
        fontSize: 20,
        padding: 0,
    },
    typography: {
        fontFamily: {
            sansSerif: Store.env.fonts.style.sansSerif,
            serif: Store.env.fonts.style.serif,
        },
        fontSize: 16,
        fontWeightLight: Store.env.fonts.weight.light,
        fontWeightRegular: Store.env.fonts.weight.regular,
        fontWeightMedium: Store.env.fonts.weight.medium,
        fontWeightBold: Store.env.fonts.weight.bold,
        fontWeightBlack: Store.env.fonts.weight.black,
        body1: {
            fontFamily: Store.env.fonts.style.sansSerif,
        },
        body2: {
            fontFamily: Store.env.fonts.style.sansSerif,
        },
        pageTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: 28,
            fontWeight: Store.env.fonts.weight.black,
        },
        contactCardTitle: {
            color: `white`,
            fontSize: 22,
            fontWeight: Store.env.fonts.weight.bold,
            lineHeight: 1,
            textAlign: `right`,
        },
        contactCardSubtitle: {
            color: `white`,
            textAlign: `right`,
        },
        introTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: 40,
            fontWeight: Store.env.fonts.weight.bold,
        },
        introSubtitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 14,
            fontWeight: Store.env.fonts.weight.medium,
            lineHeight: 2,
            color: `#999`,
        },
        pageSubtitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 18,
            fontStyle: `italic`,
            color: `#999`,
        },
        title: {
            color: Store.env.colors.primary.main,
            fontWeight: Store.env.fonts.weight.bold,
            fontSize: 20,
        },
        filterLabel: {
            color: Store.env.colors.primary.main,
            fontFamily: Store.env.fonts.style.sansSerif,
            fontWeight: Store.env.fonts.weight.bold,
        },
        filterText: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontsize: 30,
            fontWeight: Store.env.fonts.weight.bold,
            color: `black`,
            textTransform: `capitalize`,
            padding: 0,
            margin: 0,
            width: `100%`,
        },
        navBarLink: {
            textTransform: `capitalize`,
            fontWeight: Store.env.fonts.weight.bold,
        },
        priceBreakdownTitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 20,
            fontWeight: Store.env.fonts.weight.bold,
        },
        priceBreakdownTotal: {
            fontFamily: Store.env.fonts.style.serif,
            fontWeight: Store.env.fonts.weight.black,
        },
        priceBreakdownTitlePrice: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 18,
            fontWeight: Store.env.fonts.weight.medium,
        },
        roomCardLabel: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 12,
        },
        roomTypeTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: 22,
            fontWeight: Store.env.fonts.weight.bold,
            color: Store.env.colors.primary.main,
        }
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;