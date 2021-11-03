import { createTheme, responsiveFontSizes } from "@mui/material/styles";
let Theme = createTheme({
    palette: {
        background: {
            default: "#fafafa",
        },
        primary: {
            light: "#a4dcd3",
            main: "#6dc7b8",
            dark: "#40a796"
        },
        secondary: {
            light: "#d58048",
            main: "#A95B27",
            dark: "#6b3a19"
        },
        light: {
            light: "#fff",
            main: "#fafafa",
        }
    },
    shadows: ["none"],
    shape: {
        borderRadius: "1em",
        borderRadiusLg: "2em",
        borderRadiusSm: ".5em",
    },
    typography: {
        fontFamily: `"Helvetica", "Roboto", "Arial", sans-serif`,
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,
        fontWeightBlack: 800,
        body1: {
            fontFamily: "Helvetica",
        },
        body2: {
            fontFamily: "Helvetica",
        },
        pageTitle: {
            fontFamily: "PlayFair Display",
            fontSize: 28,
            fontWeight: 800,
        },
        pageSubtitle: {
            fontFamily: "Helvetica",
            fontSize: 18,
            fontStyle: "italic",
            color: "#999",
        },
        title: {
            color: "#6dc7b8",
            fontWeight: 800,
            fontSize: 20,
        },
        filterLabel: {
            color: "#6dc7b8",
            fontFamily: "Helvetica",
            fontWeight: 800,
        },
        filterText: {
            fontFamily: "Helvetica",
            fontsize: 30,
            fontWeight: 800,
            color: "black",
            textTransform: "capitalize",
            padding: 0,
            margin: 0,
            width: "100%",
        }
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;