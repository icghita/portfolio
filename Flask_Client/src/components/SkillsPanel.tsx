import { useEffect, useState } from "react"
import { Stack, Typography, Card, CardHeader, CardContent, ThemeProvider, TextField, Button } from "@mui/material"
import { global_theme, animate_fade_in } from "../styles"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { button_style } from "../styles"
import SearchIcon from "@mui/icons-material/Search"
import { IconList } from "."


export const SkillsPanel = ({ title, text, show_skills, item_id }:
    { title: string, text: string, show_skills: boolean, item_id: string }) => {

    function Handle_Change_Search(value: string) {
        Set_Local_Search_Str(value)
    }

    function Handle_Do_Search(value: string) {
        Set_Search_Str(value)
    }

    const [search_str, Set_Search_Str] = useState<string>("")
    const [local_search_str, Set_Local_Search_Str] = useState<string>("")
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
                <CardHeader title={title}
                    titleTypographyProps={card_title_style} />
                <CardContent sx={container_style}>
                    <Typography variant="body1">
                        {text}
                    </Typography>
                    {show_skills &&
                        <Stack direction="row" sx={{ my: "1em" }}>
                            <SearchIcon sx={{ fontSize: "3em", my: "auto", color: global_theme.palette.primary.main }} />
                            <TextField value={local_search_str}
                                label="Search Technology"
                                variant="filled"
                                color="secondary"
                                sx={search_field_style}
                                onChange={(e) => Handle_Change_Search(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        Handle_Do_Search(local_search_str)
                                    }
                                }} />
                            <Button onClick={() => Handle_Do_Search(local_search_str)}
                                sx={button_style}>
                                <Typography variant="subtitle1">
                                    Search
                                </Typography>
                            </Button>
                        </Stack>
                    }
                    <IconList id={item_id} search_str={search_str} />
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

const search_field_style = {
    width: "50%",
    margin: "0.5em 0.5em 0.5em 0",
    input: {
        color: global_theme.palette.secondary.contrastText,
    }
}
