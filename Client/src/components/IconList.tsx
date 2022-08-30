import { Box, Container, Grid, Typography } from "@mui/material"
import { CLIENT_URL, CLIENT_ASSETS_FOLDER } from "../config"
import { useQuery } from "@apollo/client"
import { Get_Technologies } from "../graphQL/queries.graphql"
import { Technology } from "../main"

export const IconList = ({ id }: { id: string }) => {

    const { loading: loading_technologies, error: error_technologies, data: data_technologies } = useQuery(Get_Technologies, { variables: { item_id: id } })

    return (
        <Container sx={container_style}>
            {typeof loading_technologies != "undefined" && loading_technologies === false &&
                <Grid container spacing={5} justifyContent="center">
                    {data_technologies.Technologies
                        .slice().sort((x: Technology, y: Technology) => { return parseInt(x.id) - parseInt(y.id) })
                        .map((t: Technology, index: number) => (
                            <Grid item xs="auto"
                                sx={grid_item_style}
                                key={id + t.title + index} >
                                <Box sx={stack_vertically}>
                                    {t.url && <Box component="img" sx={icon_style}
                                        src={CLIENT_URL + CLIENT_ASSETS_FOLDER + t.url} />}
                                    <Typography variant="h3">{t.title}</Typography>
                                </Box>
                            </Grid>
                        ))}
                </Grid>
            }
        </Container>
    )
}

const container_style = {
    textAlign: "center",
    padding: "5em",
}

const grid_item_style = {
    textAlign: "center",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: "transform .2s",
    "&:hover": {
        transform: "scale(1.2)"
    }
}

const icon_style = {
    width: "3em",
    height: "3em",
    marginBottom: "1em",
}

const stack_vertically = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}