import { Box, Link, Typography } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { IconList } from "./"
import { boxes_container_style, global_theme, left_box_style, right_box_style } from "../styles"
import { FOOTER_ID, SECTION_ID_PREFIX } from "../config"

const Copyright = () => {
    return (
        <Typography variant="body1" align="center" sx={{ margin: "0.5em" }}>
            {"Iulian Ghita ©"}
            {new Date().getFullYear()}
        </Typography>
    )
}

export const Footer = () => {
    return (
        <Box id={SECTION_ID_PREFIX + FOOTER_ID}
            sx={{...boxes_container_style, ...footer_style}}
            component="footer">
            <Box sx={{...left_box_style, width: "50%" }}>
                <Typography variant="h3" align="center" sx={{ margin: "0.5em" }}>
                    Contact Me
                </Typography>
                <Typography
                    variant="body1"
                    align="center" 
                    gutterBottom >
                    <Link href="mailto: ic.ghita@gmail.com"
                        target="_blank" rel="noopener noreferrer"
                        sx={link_style}>
                        <EmailIcon />ic.ghita@gmail.com   </Link>
                    <Link href="https://www.linkedin.com/in/iulian-cristian-ghita-7b4602228/"
                        target="_blank" rel="noopener noreferrer"
                        sx={link_style}><LinkedInIcon />LinkedIn   </Link>
                    <Link href="https://github.com/icghita"
                        target="_blank" rel="noopener noreferrer"
                        sx={link_style}><GitHubIcon />GitHub   </Link>
                </Typography>
                <Copyright />
            </Box>
            <Box sx={{...right_box_style, width: "50%", display: "flex", flexDirection: "row" }}>
                <Typography variant="h3" align="center" sx={{my: "auto"}}>
                    Website powered by:
                </Typography>
                <IconList id="8" search_str="" />
            </Box>
        </Box>
    )
}

const footer_style = {
    bgcolor: global_theme.palette.primary.dark,
    position: "absolute",
    bottom: "0",
    width: "100%",
    display: "flex",
    flexDirection: "row",
}

const link_style = {
    color: global_theme.palette.secondary.main,
    whiteSpace: "nowrap",
    margin: "0.3em",
}