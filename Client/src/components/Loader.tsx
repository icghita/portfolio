import { Box, CircularProgress, Fade } from "@mui/material"

export const Loader = ({ control }: { control: boolean }) => {
    return (
        <Fade
            in={control}
            style={{
                transitionDelay: control ? '800ms' : '0ms',
            }}
            unmountOnExit >
            <Box sx={{
                textAlign: 'center',
                margin: "auto",
            }}>
                <CircularProgress />
            </Box>
        </Fade>
    )
}
