import { useEffect, useState } from "react"
import { Typography, Card, CardHeader, Collapse, ThemeProvider, Container, Box, Grid, Button, useMediaQuery, CircularProgress, Link } from "@mui/material"
import LinkIcon from "@mui/icons-material/Link"
import { global_theme, dimensions_theme, animate_fade_in, animate_text_right, boxes_container_style, right_box_style, button_style } from "../styles"
import { ExpandButton, BrowsePopover } from "."
import { SECTION_ID_PREFIX, IMAGE_CONTROLS_ID } from "../config"
import { useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useQuery } from "@apollo/client"
import { Get_Background } from "../graphQL/queries.graphql"
import { Background } from "../main"


export const ImageControls = ({ background_image, Set_Background_Image }:
    { background_image: string, Set_Background_Image: Function }) => {

    async function Handle_New_BG(Get_New_BG: any) {
        Set_Getting_New(true)
        const { loading: loading_local, error: error_local, data: data_local } = await Get_New_BG()
        if (typeof loading_local != "undefined" && loading_local === false) {
            let aux_images = bg_images
            let aux_hash_map = new Map()
            aux_images.push(data_local.Background)
            aux_images = aux_images.filter((bg: Background) => {
                if (aux_hash_map.has(bg.id))
                    return false
                else {
                    aux_hash_map.set(bg.id, true)
                    return true
                }
            })
            Set_BG_Images(aux_images)
            Set_Background_Image(data_local.Background.hrimage)
        }
        Set_Getting_New(false)
    }

    function Handle_Expand_Click() {
        Set_Expanded(!expanded)
        if (!expanded)
            animation_controls.start("opened")
        else
            animation_controls.start("closed")
    }

    function Handle_Open_Browse(event: React.MouseEvent<HTMLButtonElement>) {
        Set_Anchor_Browse(event.currentTarget)
    }

    function Handle_Close_Browse() {
        Set_Anchor_Browse(null)
    }

    function Handle_Open_Image(link: string) {
        window.open(link, "_blank", "noopener")
    }

    const [anchor_browse, Set_Anchor_Browse] = useState<HTMLButtonElement | null>(null)
    const opened_browse = Boolean(anchor_browse)
    const browse_id = opened_browse ? "browse-popover" : undefined

    const [getting_new, Set_Getting_New] = useState<boolean>(false)
    const [bg_images, Set_BG_Images] = useState<Background[]>([])
    const [expanded, Set_Expanded] = useState(false)
    const { loading: loading_bg,
        error: error_bg,
        data: data_bg,
        refetch: Get_New_BG } = useQuery(Get_Background)

    const small_screen = useMediaQuery(dimensions_theme.breakpoints.down("lg"))
    const animation_controls = useAnimation()
    const [view_ref, in_view] = useInView()

    useEffect(() => {
        if (typeof loading_bg !== "undefined" && !loading_bg && typeof data_bg !== "undefined") {
            let aux_images = bg_images
            let aux_hash_map = new Map()
            aux_images.push(data_bg.Background)
            aux_images = aux_images.filter((bg: Background) => {
                if (aux_hash_map.has(bg.id))
                    return false
                else {
                    aux_hash_map.set(bg.id, true)
                    return true
                }
            })
            Set_BG_Images(bg_images)
            Set_Background_Image(data_bg.Background.hrimage)
        }
    }, [data_bg])

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
                        collapsedSize="19em"
                        sx={{ borderRadius: "25px" }}>
                    <Card sx={card_style}>
                        <CardHeader
                            title="Image Controls"
                            titleTypographyProps={card_title_style} />
                        <Container sx={{ ...boxes_container_style, padding: "2em 2em 4em 2em" }}>
                            <Grid container sx={{ height: "10em", width: "10em", marginBottom: "4em" }}>
                                <Grid item xs={12}>
                                    <Button sx={button_style}
                                            disabled={getting_new}
                                            onClick={() => Handle_New_BG(Get_New_BG)} >
                                        {getting_new
                                            ? <CircularProgress sx={{color: global_theme.palette.secondary.light}} />
                                            : <Typography variant="subtitle1">
                                                New
                                            </Typography>
                                        }
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button sx={button_style}
                                        onClick={Handle_Open_Browse}>
                                        <Typography variant="subtitle1">
                                            Browse
                                        </Typography>
                                    </Button>
                                    <BrowsePopover id={browse_id}
                                        open={opened_browse}
                                        anchor_element={anchor_browse}
                                        On_Close={Handle_Close_Browse}
                                        bg_images={bg_images}
                                        Set_Background_Image={Set_Background_Image} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button sx={button_style}
                                        onClick={() => Handle_Open_Image(background_image)}>
                                        <Typography variant="subtitle1">
                                            Open
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
                            <Box sx={explanation_box_style}
                                    {...animate_text_right}
                                    animate={animation_controls} >
                                <Typography variant="body1">
                                    The background wallpapers are generated by a stable diffusion neural network and then upscaled using an ESRGAN network, which were trained on a set of 5000 astronomical images.
                                    <br/>
                                    Use the "New" button to generate a new image, browse through the generated ones to change the wallpaper and open the current wallpaper in a new tab to save it!
                                    <br/>
                                    Source code and trained models can be found at <Link href={diffusion_repository} target="_blank" rel="noopener noreferrer" sx={link_style}>{diffusion_repository}<LinkIcon /></Link>
                                </Typography>
                            </Box>
                        </Container>
                    </Card>
                </Collapse>
            </Container>
        </ThemeProvider >
    )
}

const diffusion_repository = "https://github.com/icghita/unconditional_generation_diffusion"

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

const link_style = {
    color: global_theme.palette.secondary.main,
    whiteSpace: "nowrap",
}

export const explanation_box_style = {
    [dimensions_theme.breakpoints.up("lg")]: {
        width: "70%",
        marginLeft: "1em",
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        width: "100%",
        marginLeft: 0,
    }
}
