import { CssBaseline, Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { BackgroundPanel, NavigationButtons, Footer } from "./components"
import { global_theme } from "./styles"
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject, DocumentNode, ApolloQueryResult } from "@apollo/client"
import { SERVER_URL, GET_TOKEN, NUM_TRIES, COOKIE_NAME } from "./config"
import { Get_Items, Get_JWT } from "./graphQL/queries.graphql"
import { useEffect, useState } from "react"
import { BackgroundImage } from "react-image-and-background-image-fade"
import { BLANK_BG } from "./config"


const App = () => {

    function Handle_Background_Image(bg: string) {
        Set_Background_Image(`data:image/jpeg;base64,${bg}`)
    }

    const [background_image, Set_Background_Image] = useState<string>("")

    const background_style = {
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
    }

    return (
        <CssBaseline>
            <ThemeProvider theme={global_theme}>
                <BackgroundImage src={background_image.length == 0 ? BLANK_BG : background_image}
                    isResponsive
                    transitionTime="2s"
                    style={background_style} >
                    <NavigationButtons />
                    <BackgroundPanel background_image={background_image}
                        Set_Background_Image={Handle_Background_Image} />
                    <Footer />
                </BackgroundImage>
            </ThemeProvider>
        </CssBaseline >
    )
}
export default App
