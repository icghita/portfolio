import { Box, Typography } from "@mui/material"
import { SECTION_ID_PREFIX } from "../config"
import { animate_text_right, global_theme } from "../styles"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"

export const TitleBox = ({ id, text, main_title }: 
    { id: string, text: string, main_title?: boolean | undefined }) => {

    const animation_controls = useAnimation()
    const [view_ref, in_view] = useInView()

    useEffect(() => {
        if (in_view) {
            animation_controls.start("opened")
        }
    }, [animation_controls, in_view])

    return (
        <Box sx={separator_style}
            key={id + text}
            {...animate_text_right}
            ref={view_ref}
            animate={animation_controls} >
            {!main_title &&
                <Typography
                    id={SECTION_ID_PREFIX + id}
                    key={SECTION_ID_PREFIX + id}
                    variant="h1" >
                    {text}
                </Typography>
            }
            {main_title &&
                <Typography id={SECTION_ID_PREFIX + id}
                    key={SECTION_ID_PREFIX + id}
                    variant="h3" >
                    <pre>
                        &#128075; Hello! I am
                        <Typography
                            id={SECTION_ID_PREFIX + id}
                            key={SECTION_ID_PREFIX + id}
                            variant="h2" >
                            Iulian
                        </Typography>
                        Software Developer
                    </pre>
                </Typography>
            }
        </Box>
    )
}

const separator_style = {
    background: global_theme.palette.primary.dark,
    borderRadius: "25px",
    height: "10em",
    width: "20em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    padding: "0.2em",
    opacity: 0.8,
}
