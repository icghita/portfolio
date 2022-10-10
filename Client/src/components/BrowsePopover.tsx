import { Popover, Box, Grid, Button, Typography } from "@mui/material"
import { Background } from "../main"
import { global_theme, button_style } from "../styles"


export const BrowsePopover = ({ id, open, anchor_element, On_Close, bg_images, Set_Background_Image }:
    {
        id: string | undefined,
        open: boolean,
        anchor_element: HTMLButtonElement | null,
        On_Close: any,
        bg_images: Background[],
        Set_Background_Image: Function
    }) => {

    return (
        <Popover id={id}
            open={open}
            anchorEl={anchor_element}
            onClose={On_Close}
            elevation={16}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} >
            <Box sx={popover_style}>
                <Typography variant="h3" align="center" gutterBottom sx={{ padding: "0.5em" }}>
                    Select a Background Image
                </Typography>
                <Grid container spacing={5}>
                    {bg_images.map((img: Background) => (
                        <Grid item xs="auto"
                            key={"bg_" + img.id}>
                            <Box component="img" 
                                src={`data:image/png;base64,${img.lrimage}`}
                                alt={img.id}
                                onClick={() => Set_Background_Image(img.hrimage)}
                                sx={img_list_style} />
                        </Grid>
                    ))}
                </Grid>
                <Button sx={button_style}
                    onClick={On_Close}>
                    <Typography variant="subtitle1" align="right">
                        Cancel
                    </Typography>
                </Button>
            </Box>
        </Popover>
    )
}

const popover_style = {
    background: global_theme.palette.primary.dark,
    padding: "1em",
    overflow: "scroll",
    maxWidth: "50vw",
    maxHeight: "50vh",
    border: "1em solid",
    borderColor: global_theme.palette.primary.dark,
}

const img_list_style = {
    padding: "0.5em",
    "&:hover": {
        cursor: "pointer",
        backgroundColor: global_theme.palette.primary.main,
    }
}
