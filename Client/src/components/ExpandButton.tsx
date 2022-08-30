import { useState } from "react"
import { styled } from "@mui/material/styles"
import { IconButton, IconButtonProps } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { global_theme } from "../styles"


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean
    close_direction: number
    open_direction: number
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, close_direction, open_direction, ...other } = props

    return <IconButton {...other} />
})(
    ({ theme, expand, close_direction, open_direction }) =>
    ({
        transform: !expand ? `rotate(${close_direction}deg)` : `rotate(${open_direction}deg)`,
        transition: theme.transitions.create("transform",
            {
                duration: theme.transitions.duration.shortest,
            }),
    })
)

export const ExpandButton = ({expand, Click_Handler, close_direction, open_direction }:
    {expand: boolean, Click_Handler: () => void, close_direction: number, open_direction: number }) => {

    return (
        <ExpandMore
            onClick={Click_Handler}
            expand={expand}
            close_direction={close_direction}
            open_direction={open_direction}
            aria-expanded={expand}
            aria-label="show more">
            <ExpandMoreIcon sx={expand_icon_style} />
        </ExpandMore>
    )
}

const expand_icon_style = {
    fontSize: 50,
    color: global_theme.palette.secondary.light,
    background: global_theme.palette.primary.main,
    borderRadius: "25px",
}