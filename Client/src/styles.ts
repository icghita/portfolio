import { createTheme } from "@mui/material"
import { motion } from "framer-motion"

const primary_light = "#9c99e1"
const primary_main = "#6c6baf"
const primary_dark = "#3d407f"
const primary_contrast_text = "#ccf1ff"

const secondary_light = "#ffd8ff"
const secondary_main = "#cba6f7"
const secondary_dark = "#9977c4"
const secondary_contrast_text = "#e3e3e3"

export const dimensions_theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1550,
            xl: 1836,
        },
    },
})

export const global_theme = createTheme({
    palette: {
        primary: {
            light: primary_light,
            main: primary_main,
            dark: primary_dark,
            contrastText: primary_contrast_text,
        },
        secondary: {
            light: secondary_light,
            main: secondary_main,
            dark: secondary_dark,
            contrastText: secondary_contrast_text,
        },
    },
    typography: {
        body1: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: primary_contrast_text,
            fontSize: 20,
            textAlign: "justify",
            textJustify: "auto",
            whiteSpace: "pre-wrap",
        },
        body2: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: secondary_contrast_text,
            fontSize: 18,
            textAlign: "justify",
            textJustify: "auto",
            whiteSpace: "pre-wrap",
        },
        subtitle1: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: secondary_contrast_text,
        },
        h1: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            textDecoration: "bold",
            color: primary_light,
            fontSize: 76,
        },
        h2: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            textDecoration: "bold",
            color: primary_light,
            fontSize: 50,
        },
        h3: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: primary_contrast_text,
            fontSize: 26,
            whiteSpace: "pre-wrap",
        },
        h4: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: secondary_contrast_text,
            fontSize: 18,
        },
        h5: {
            fontFamily: ["Iosevka", "sans-serif"].join(","),
            color: secondary_main,
            fontSize: 20,
        }
    }
})

export const boxes_container_style = {
    display: "flex",
    [dimensions_theme.breakpoints.up("lg")]: {
        flexDirection: "row",
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        flexDirection: "column",
    }
}

export const left_box_style = {
    [dimensions_theme.breakpoints.up("lg")]: {
        marginRight: "1em",
        marginBottom: 0,
        width: "50%"
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        marginRight: 0,
        marginBottom: "1em",
        width: "100%"
    }
}

export const right_box_style = {
    [dimensions_theme.breakpoints.up("lg")]: {
        width: "50%",
        marginLeft: "1em",
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        width: "100%",
        marginLeft: 0,
    }
}

export const animate_fade_in = {
    component: motion.div,
    variants: {
        hidden: { opacity: 0, scale: 0.5, borderRadius: "100px" },
        visible: { opacity: 1, scale: 1, borderRadius: "25px" },
    },
    initial: "hidden",
    transition: { duration: 1.5 },
}

export const animate_text_right = {
    component: motion.div,
    variants: {
        closed: { opacity: 0, x: 300 },
        opened: { opacity: 1, x: 0 },
    },
    initial: "closed",
    transition: { duration: 0.8 },
}

export const animate_text_left = {
    component: motion.div,
    variants: {
        closed: { opacity: 0, x: -300 },
        opened: { opacity: 1, x: 0 },
    },
    initial: "closed",
    transition: { duration: 0.8 },
}

export const animate_staggered = {
    component: motion.div,
    variants: {
        closed: { opacity: 0 },
        opened: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.5,
            }
        }
    },
    initial: "closed",
}

export const animate_staggered_child = {
    component: motion.div,
    variants: {
        closed: { opacity: 0, scale: 0.5 },
        opened: { opacity: 1, scale: 1 },
    },
    transition: { duration: 0.8 },
    initial: "closed",
}

export const button_style = {
    background: global_theme.palette.primary.main,
    color: global_theme.palette.secondary.light,
    width: "6em",
    borderRadius: "25px",
    margin: "0.5em 0 0.5em 0",
    "&:hover": {
        background: global_theme.palette.primary.dark,
    }
}
