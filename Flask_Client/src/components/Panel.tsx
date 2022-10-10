import { Box, Paper, Card, CardActionArea, CardContent } from "@mui/material"

export const Panel = ({ children }: {children: JSX.Element}) => 
{
    return (
        <Box sx={container_style}>
            <Card sx={transparent_panel}>
                <CardActionArea>
                    <CardContent>
                        {children}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

const transparent_panel = 
{
    opacity: 0.6,
    backgroundColor: "gray",
    borderRadius: "25px"
}

const container_style = 
{
    display: "flex",
    margin: "auto",
    width: "80%"
}