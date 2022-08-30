import { Grid, Button, useMediaQuery, Typography, IconButton, Menu, MenuItem, Box } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Get_Items } from "../graphQL/queries.graphql"
import { useQuery } from "@apollo/client"
import { Item } from "../main"
import { SECTION_ID_PREFIX, NAVIGATION_BUTTON_PREFIX, SECTION_SEPARATOR, IMAGE_CONTROLS_ID, FOOTER_ID } from "../config"
import { global_theme, dimensions_theme } from "../styles"
import { useEffect, useRef, useState } from "react"



export const NavigationButtons = () => {


    function Handle_Click_Menu(event: React.MouseEvent<HTMLElement>) {
        Set_Anchor_Element(event.currentTarget)
    }

    function Handle_Close_Menu() {
        Set_Anchor_Element(null)
    }

    function Handle_Scroll_To(id: string): void {
        const element = document.getElementById(id)
        element && element.scrollIntoView({ behavior: "smooth", block: "start" })
        Handle_Close_Menu()
    }

    const { loading: loading_items, error: error_items, data: data_items } = useQuery(Get_Items)
    const [re_render, Set_Re_Render] = useState<number>(0)
    const sections = useRef<Item[]>([])
    const active_sections = useRef<boolean[]>()

    const large_screen = useMediaQuery(dimensions_theme.breakpoints.up("xl"))
    const medium_screen = useMediaQuery(dimensions_theme.breakpoints.between("lg", "xl"))
    const small_screen = useMediaQuery(dimensions_theme.breakpoints.down("lg"))

    const [anchor_element, Set_Anchor_Element] = useState<null | HTMLElement>(null)
    const open_menu = Boolean(anchor_element)


    useEffect(() => {
        if (typeof loading_items != "undefined" && loading_items === false) {
            let aux = data_items.Items
                .slice().filter((item: Item) => (item.title === SECTION_SEPARATOR))
            const img_ctrl: Item = { id: IMAGE_CONTROLS_ID, description: "Image Controls", title: "", subtitle: "" }
            const footer: Item = { id: FOOTER_ID, description: "Contact", title: "", subtitle: "" }
            aux.unshift(img_ctrl)
            aux.unshift(footer)
            aux.sort((x: Item, y: Item) => { return parseInt(x.id) - parseInt(y.id) })

            sections.current = aux.slice()
            active_sections.current = Array.from({ length: sections.current.length }, () => false)
            Set_Re_Render(re_render + 1 % 100)
        }
    }, [data_items])

    return (
        <Box sx={navigation_style}>
            {typeof loading_items != "undefined" && loading_items === false && (large_screen || medium_screen) &&
                <Grid container spacing={2}>
                    {sections.current.map((item: Item) => (
                        <Grid item key={NAVIGATION_BUTTON_PREFIX + item.id} xs={12}>
                            <Button sx={button_style}
                                size={medium_screen ? "small" : "large"}
                                id={NAVIGATION_BUTTON_PREFIX + item.id}
                                onClick={() => { Handle_Scroll_To(SECTION_ID_PREFIX + item.id) }}>
                                <Typography variant="subtitle1"
                                    sx={button_text_style}>
                                    {item.description}
                                </Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            }
            {typeof loading_items != "undefined" && loading_items === false && small_screen &&
                <>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open_menu ? "long-menu" : undefined}
                        aria-expanded={open_menu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={Handle_Click_Menu} >
                        <MenuIcon sx={menu_button_style} />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{ "aria-labelledby": "long-button" }}
                        anchorEl={anchor_element}
                        open={open_menu}
                        onClose={Handle_Close_Menu}
                        PaperProps={expandable_menu_style} >
                        {sections.current.map((item: Item) => (
                            <MenuItem sx={menu_item_style}
                                key={NAVIGATION_BUTTON_PREFIX + "collapse_" + item.id}
                                onClick={() => { Handle_Scroll_To(SECTION_ID_PREFIX + item.id) }}>
                                {item.description}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            }
        </Box>
    )
}

const navigation_style = {
    position: "fixed",
    [dimensions_theme.breakpoints.up("lg")]: {
        margin: "2em",
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        margin: 0,
    }
}

const button_style = {
    background: global_theme.palette.primary.main,
    color: global_theme.palette.secondary.light,
    overflow: "hidden",
    borderRadius: "25px",
    padding: "1em",
    "&:hover": {
        background: global_theme.palette.primary.dark,
    },
    [dimensions_theme.breakpoints.between("lg", "xl")]: {
        width: "6em",
    },
    [dimensions_theme.breakpoints.up("xl")]: {
        width: "10em",
    },
}

const button_text_style = {
    [dimensions_theme.breakpoints.between("lg", "xl")]: {
        fontSize: 14,
    },
    [dimensions_theme.breakpoints.up("xl")]: {
        fontSize: 18,
    }
}

const menu_button_style = {
    fontSize: 40,
    marginTop: "2em",
    borderRadius: "25px",
    color: global_theme.palette.secondary.light,
    background: global_theme.palette.primary.main,
    "&:hover": {
        background: global_theme.palette.primary.dark,
    },
}

const expandable_menu_style = {
    style: {
        maxHeight: 40 * 4.5,
        width: "20ch",
        background: global_theme.palette.primary.main,
    },
}

const menu_item_style = {
    background: global_theme.palette.primary.main,
    "&:hover": {
        background: global_theme.palette.primary.dark,
    },
}