import React, { useState } from "react";
import "./App.style"
import CameraIcon from "@mui/icons-material/PhotoCamera";
import { AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Stack, Box, Toolbar, Typography, Container, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Panel, SecondaryPanel } from "./components"
import { background_image } from "./App.style"

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const theme = createTheme();

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <div style={background_image}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            Album layout
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Album layout
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Something short and leading about the collection below—its contents,
                            the creator, etc. Make it short and sweet, but not too short so folks
                            don&apos;t simply skip over it entirely.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">Main call to action</Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="xl">
                    {/* End hero unit */}
                    <Panel>
                        <Grid container spacing={4}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={6}>
                                    <SecondaryPanel />
                                </Grid>
                            ))}
                        </Grid>
                    </Panel>

                </Container>

                {/* Footer */}
                <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="text.secondary"
                        component="p"
                    >
                        Something here to give the footer a purpose!
                    </Typography>
                    <Copyright />
                </Box>
                {/* End footer */}
            </div>
        </ThemeProvider>
    );
}