import { useEffect } from "react"
import { Box, Typography, Card, CardHeader, CardContent, ThemeProvider } from "@mui/material"
import { global_theme, animate_fade_in } from "../styles"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { IconList } from "."


export const NormalPanel = ({ title, text, icons, item_id }:
    { title: string, text: string, icons: boolean, item_id: string }) => {

    const animation_controls = useAnimation()
    const [view_ref, in_view] = useInView()

    useEffect(() => {
        if (in_view) {
            animation_controls.start("visible")
        }
    }, [animation_controls, in_view])

    return (
        <ThemeProvider theme={global_theme} >
            <Card key={title + item_id}
                sx={card_style}
                {...animate_fade_in}
                ref={view_ref}
                animate={animation_controls} >
                <CardHeader
                    title={title}
                    titleTypographyProps={card_title_style} />
                <CardContent sx={container_style}>
                    <Typography variant="body1">
                        {text}
                    </Typography>
                    {icons &&
                        <IconList id={item_id} />
                    }
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}


const container_style = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
}

const card_style = {
    margin: "2em",
    padding: "2em",
    borderRadius: "25px",
    background: global_theme.palette.primary.dark,
}

const card_title_style = {
    fontWeight: "bold",
    color: global_theme.palette.primary.contrastText,
    fontFamily: ["Iosevka", "sans-serif"].join(","),
    fontSize: 40,
}
