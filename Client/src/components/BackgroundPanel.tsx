import { Box, Card, CardContent, Container } from "@mui/material"
import { ExpandablePanel, ImageControls, Loader, TitleBox, SkillsPanel } from "./"
import { useQuery } from "@apollo/client"
import { Get_Items } from "../graphQL/queries.graphql"
import { Item } from "../main"
import { SECTION_SEPARATOR, NORMAL_PANEL, SKILLS_PANEL } from "../config"
import { dimensions_theme } from "../styles"

export const BackgroundPanel = ({ background_image, Set_Background_Image }:
    { background_image: string, Set_Background_Image: Function }) => {

    const { loading: loading_items, error: error_items, data: data_items } = useQuery(Get_Items)

    return (
        <Container sx={container_style} maxWidth={"xl"}>
            <Card sx={transparent_panel}>
                <CardContent>
                    <Box sx={flex_style}>
                        <Box sx={{ align: "center", justify: "center", margin: "auto" }}>
                            <TitleBox id="main_title" text="" main_title={true} />
                        </Box>
                        <ImageControls background_image={background_image}
                            Set_Background_Image={Set_Background_Image} />
                    </Box>
                    {typeof loading_items != "undefined" && loading_items === false && data_items != "undefined" &&
                        <Box>
                            {data_items.Items
                                    .slice().sort((x: Item, y: Item) => { return parseInt(x.id) - parseInt(y.id) })
                                    .map((item: Item) => {
                                        if (item.title === SECTION_SEPARATOR)
                                            return (
                                                <TitleBox key={"title_" + item.id}
                                                    id={item.id}
                                                    text={item.description} />
                                            )
                                        else if (item.title === NORMAL_PANEL)
                                            return (
                                                <SkillsPanel key={"norm_" + item.id}
                                                    title={item.subtitle}
                                                    text={item.description}
                                                    show_skills={false}
                                                    item_id={item.id} />
                                            )
                                        else if (item.title === SKILLS_PANEL)
                                            return (
                                                <SkillsPanel key={"skills_" + item.id}
                                                    title={item.subtitle}
                                                    text={item.description}
                                                    show_skills={true}
                                                    item_id={item.id} />
                                            )
                                        return (
                                            <ExpandablePanel key={"item_" + item.id}
                                                title={item.title}
                                                left_subtitle={item.subtitle}
                                                left_column={item.description}
                                                item_id={item.id} />
                                        )
                                    })}
                        </Box>
                    }
                    {loading_items &&
                        <Loader control={loading_items} />
                    }
                </CardContent>
            </Card>
        </Container>
    )
}

const flex_style = {
    display: "flex",
    [dimensions_theme.breakpoints.up("lg")]: {
        flexDirection: "row-reverse",
    },
    [dimensions_theme.breakpoints.down("lg")]: {
        flexDirection: "column",
    }
}


const container_style = {
    padding: "2em 0 8em 0",
}

const transparent_panel = {
    background: "rgba(61, 64, 127, 0.5)",
    borderRadius: "25px",
    outerWidth: "100%",
}
