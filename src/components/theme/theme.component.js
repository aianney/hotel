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
        fontFamily: `
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Store.env.fonts.style.sansSerif,
        Arial,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        `,
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
            fontFamily: `PlayFair Display`,
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
            fontSize: 45,
            fontWeight: Store.env.fonts.weight.black,
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
        roomCardLabel: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: 12,
        }
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;