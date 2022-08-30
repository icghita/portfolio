import { Box, Container, Typography, ImageList, ImageListItem, Link, ImageListItemBar, createTheme } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';
import { useQuery } from "@apollo/client"
import { Get_Contents, Get_Images } from "../graphQL/queries.graphql"
import { Content, ImageContent } from "../main"
import { boxes_container_style, left_box_style, right_box_style, animate_text_left, animate_staggered, animate_staggered_child, global_theme } from "../styles"
import { useAnimation } from "framer-motion"
import { useEffect } from "react"


export const Contents = ({ id, opened }: { id: string, opened: boolean }) => {

    function Handle_Open_Image(link: string) {
        window.open(link, "_blank", "noopener")
    }

    const { loading: loading_contents, error: error_contents, data: data_contents } = useQuery(Get_Contents, { variables: { item_id: id } })
    const { loading: loading_images, error: error_images, data: data_images } = useQuery(Get_Images, { variables: { item_id: id } })
    const animation_controls = useAnimation()

    useEffect(() => {
        if (opened)
            animation_controls.start("opened")
        else
            animation_controls.start("closed")
    }, [opened])

    return (
        <Container sx={{ ...boxes_container_style, ...centered_style }}>
            {typeof loading_contents != "undefined" && loading_contents === false &&
                <Box key={"left_box_" + id}
                    sx={left_box_style}
                    {...animate_text_left}
                    animate={animation_controls} >
                    {data_contents.Contents.map((c: Content) => (
                        <Box key={id + c.id}>
                            <Typography variant="h4">{c.title}</Typography>
                            <Typography variant="body1" sx={{marginTop:"1em", marginRight:"1em"}}>{c.text}</Typography>
                            {c.links && c.links.split(",").map((l) => (
                                l.startsWith("http")
                                    ? <Typography variant="h5">
                                        <Link href={l} target="_blank" rel="noopener noreferrer" sx={link_style}>{l}<LinkIcon /></Link>
                                    </Typography>
                                    : <Typography variant="body1">{l}</Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
            }
            {typeof loading_images != "undefined" && loading_images === false &&
                <Box sx={{ ...right_box_style }} >
                    {data_images &&
                        <ImageList
                            variant="quilted"
                            cols={2}
                            rowHeight="auto"
                            {...animate_staggered}
                            animate={animation_controls} >
                            {data_images.Images.map((im: ImageContent, index: number) => (
                                <ImageListItem key={id + im.id + index}
                                    cols={im.cols || 1}
                                    rows={im.rows || 1}
                                    sx={hover_image_style}
                                    {...animate_staggered_child}
                                    animate={animation_controls}
                                    onClick={() => Handle_Open_Image(`data:image/png;base64,${im.encoded}`)} >
                                    <img src={`data:image/png;base64,${im.encoded}`}
                                        alt={im.id}
                                        loading="lazy"
                                        width="inherited" height="inherited" />
                                    <ImageListItemBar
                                        title={im.description}
                                        className="ItemBar" />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    }
                </Box>
            }
        </Container >
    )
}

const centered_style = {
    display: "flex",
    justifyContent: "center",
    margin: 0,
}

const link_style = {
    color: global_theme.palette.secondary.main,
    whiteSpace: "nowrap",
}

const hover_image_style = {
    "& .ItemBar": {
        opacity: 0
    },
    "&:hover": {
        cursor: "pointer",
        "& .ItemBar": {
            opacity: 1,
        }
    }
}

