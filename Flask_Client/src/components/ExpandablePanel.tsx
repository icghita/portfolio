import { useEffect, useState } from "react"
import { ExpandButton, IconList, Contents } from "."
import { Box, Typography, Card, CardHeader, CardContent, CardActions, Collapse, ThemeProvider } from "@mui/material"
import { global_theme, boxes_container_style, left_box_style, right_box_style, animate_fade_in } from "../styles"
import { TECHNOLOGIES_SUBTITLES } from "../config"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"


export const ExpandablePanel = ({ title, left_subtitle, left_column, item_id }:
    { title: string, left_subtitle: string, left_column: string, item_id: string }) => {

    function Handle_Expand_Click() {
        Set_Expanded(!expanded)
    }

    const [expanded, Set_Expanded] = useState<boolean>(false)
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
                <CardContent sx={{ ...boxes_container_style, ...centered_style }}>
                    <Box sx={left_box_style}>
                        <Typography variant="h4" sx={{ textAlign: "left" }}>
                            {left_subtitle}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: "1em" }} >
                            {left_column}
                        </Typography>
                    </Box>
                    <Box sx={right_box_style}>
                        <Typography variant="h4" sx={{ ...centered_style, marginBottom: "1em" }}>
                            {TECHNOLOGIES_SUBTITLES}
                        </Typography>
                        <IconList id={item_id} search_str="" />
                    </Box>
                </CardContent>
                <CardActions sx={centered_style}>
                    <ExpandButton expand={expanded}
                        Click_Handler={Handle_Expand_Click}
                        close_direction={0}
                        open_direction={180} />
                </CardActions>
                <Collapse in={expanded}
                    timeout="auto">
                    <CardContent key={"card_cont_" + item_id}>
                        <Contents id={item_id}
                            opened={expanded} />
                    </CardContent>
                </Collapse>
            </Card>
        </ThemeProvider>
    )
}


const centered_style = {
    display: "flex",
    justifyContent: "center",
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




