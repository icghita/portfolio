import { Box, Container, Grid, Typography } from "@mui/material"
import { CLIENT_ASSETS_FOLDER } from "../config"
import { useQuery } from "@apollo/client"
import { Get_Technologies } from "../graphQL/queries.graphql"
import { Technology } from "../main"
import { useEffect, useState } from "react"

export const IconList = ({ id, search_str }: { id: string, search_str: string }) => {

    const { loading: loading_technologies, error: error_technologies, data: data_technologies } = useQuery(Get_Technologies, { variables: { item_id: id } })
    const [displayed_technologies, Set_Displayed_Technologies] = useState<Technology[]>([])

    useEffect(() => {
        if (typeof loading_technologies !== "undefined" 
                && !loading_technologies 
                && typeof data_technologies !== "undefined") {
            Set_Displayed_Technologies(data_technologies.Technologies)
        }
    }, [data_technologies])

    useEffect(() => {
        if (typeof search_str != "undefined" 
                && typeof loading_technologies !== "undefined" 
                && !loading_technologies 
                && typeof data_technologies !== "undefined") {
            let split_search = search_str.trim().split(/\s+/)
            let filtered_technologies: Technology[]
            filtered_technologies = data_technologies.Technologies.filter((t: Technology) => {
                for (let s of split_search) {
                    if (t.title.toLowerCase().includes(s.toLowerCase()))
                        return true
                }
                return false
            })
            Set_Displayed_Technologies(filtered_technologies)
        }
    }, [search_str])

    return (
        <Container sx={container_style}>
            {typeof loading_technologies != "undefined" && loading_technologies === false &&
                <Grid container spacing={5} justifyContent="center">
                    {displayed_technologies
                        .slice().sort((x: Technology, y: Technology) => { return parseInt(x.id) - parseInt(y.id) })
                        .map((t: Technology, index: number) => (
                            <Grid item xs="auto"
                                sx={grid_item_style}
                                key={id + t.title + index} >
                                <Box sx={stack_vertically}>
                                    {t.url && <Box component="img" sx={icon_style}
                                        src={CLIENT_ASSETS_FOLDER + t.url} />}
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
    padding: "2em",
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