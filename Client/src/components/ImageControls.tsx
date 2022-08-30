import { useEffect, useState } from "react"
import { Typography, Card, CardHeader, CardContent, CardActions, Collapse, ThemeProvider, Container, Box, Grid, Button, useMediaQuery } from "@mui/material"
import { ExpandButton } from "."
import { global_theme, dimensions_theme, animate_fade_in, animate_text_right, boxes_container_style, left_box_style, right_box_style } from "../styles"
import { SECTION_ID_PREFIX, IMAGE_CONTROLS_ID } from "../config"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export const ImageControls = () => {

    const Handle_Expand_Click = () => {
        Set_Expanded(!expanded)
        if (!expanded)
            animation_controls.start("opened")
        else
            animation_controls.start("closed")
    }

    const [expanded, Set_Expanded] = useState(false)
    const small_screen = useMediaQuery(dimensions_theme.breakpoints.down("lg"))
    const animation_controls = useAnimation()
    const [view_ref, in_view] = useInView()

    useEffect(() => {
        if (in_view) {
            animation_controls.start("visible")
        }
    }, [animation_controls, in_view])

    return (
        <ThemeProvider theme={global_theme}>
            <Container id={SECTION_ID_PREFIX + IMAGE_CONTROLS_ID}
                key={SECTION_ID_PREFIX + IMAGE_CONTROLS_ID}
                {...animate_fade_in}
                ref={view_ref}
                animate={animation_controls}
                sx={container_style} >
                <Collapse in={expanded}
                    orientation={small_screen ? "vertical" : "horizontal"}
                    timeout="auto"
                    collapsedSize="15em"
                    sx={{ borderRadius: "25px" }}>
                    <Card sx={card_style}>
                        <CardHeader
                            title="Image Controls"
                            titleTypographyProps={card_title_style} />
                        <Container sx={{...boxes_container_style, padding: "1em"}}>
                            <Grid container sx={{height: "10em", width: "10em"}}>
                                <Grid item xs={12}>
                                    <Button sx={button_style}>
                                        <Typography variant="subtitle1">
                                            New
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button sx={button_style}>
                                        <Typography variant="subtitle1">
                                            Similar
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <ExpandButton expand={expanded}
                                        Click_Handler={Handle_Expand_Click}
                                        close_direction={small_screen ? 0 : 270}
                                        open_direction={small_screen ? 180 : 90} />
                                </Grid>
                            </Grid>
                            <Box sx={right_box_style}
                                {...animate_text_right}
                                animate={animation_controls} >
                                <Typography variant="body1">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, id?
                                </Typography>
                            </Box>
                        </Container>
                    </Card>
                </Collapse>
            </Container>
        </ThemeProvider >
    )
}


const button_style = {
    background: global_theme.palette.primary.main,
    color: global_theme.palette.secondary.light,
    width: "6em",
    borderRadius: "25px",
    margin: "0.5em 0 0.5em 0",
    "&:hover": {
        background: global_theme.palette.primary.dark,
    }
}

const card_style = {
    background: global_theme.palette.secondary.dark,
    borderRadius: "25px",
    width: "100%",
    height: "100%",
}

const card_title_style = {
    fontWeight: "bold",
    fontSize: 26,
    color: global_theme.palette.secondary.contrastText,
    fontFamily: ["Iosevka", "sans-serif"].join(","),
}

const container_style = {
    margin: "2em",
    padding: "1em",
    zindex: 1,
}
