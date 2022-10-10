import { CssBaseline, Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { BackgroundPanel, NavigationButtons, Footer } from "./components"
import { global_theme } from "./styles"
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject, DocumentNode, ApolloQueryResult } from "@apollo/client"
import { SERVER_URL, GET_TOKEN, NUM_TRIES, COOKIE_NAME } from "./config"
import { Get_Items, Get_JWT } from "./graphQL/queries.graphql"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { BackgroundImage } from "react-image-and-background-image-fade"
import { BLANK_BG } from "./config"


async function Get_Query(client: ApolloClient<NormalizedCacheObject>, query: DocumentNode): Promise<ApolloQueryResult<any> | number> {
    try {
        const res = await client.query({ query: query })
        return res
    }
    catch (error: any) {
        if (typeof error.networkError?.response?.status !== "undefined")
            return error.networkError?.response?.status
        else
            return 9999
    }
}

async function Initialize_Apollo(
    Set_Apollo_Provider: React.Dispatch<React.SetStateAction<ApolloClient<any>>>
) {
    const apollo_client: ApolloClient<any> = new ApolloClient({
        uri: SERVER_URL,
        cache: new InMemoryCache(),
        headers: {
            "Access-Control-Allow-Origin": SERVER_URL,
        },
    })
    Set_Apollo_Provider(apollo_client)
}

async function Reconnect_Apollo(
    Set_Cookies: (name: any, value: any) => void,
    Set_Apollo_Provider: React.Dispatch<React.SetStateAction<ApolloClient<any>>>
) {

    let i: number = 0
    while (i < NUM_TRIES) {
        i++
        const jwt_apollo_client: ApolloClient<any> = new ApolloClient({
            uri: SERVER_URL + GET_TOKEN,
            cache: new InMemoryCache(),
        })
        Get_Query(jwt_apollo_client, Get_JWT)
            .then((query_response) => {
                if (typeof query_response !== "number") {
                    const new_jwt = query_response?.data?.JWT[0].token
                    Set_Cookies(COOKIE_NAME, new_jwt)

                    const apollo_client: ApolloClient<any> = new ApolloClient({
                        uri: SERVER_URL,
                        cache: new InMemoryCache(),
                        headers: { "Authorization": "Bearer " + new_jwt },
                    })
                    Set_Apollo_Provider(apollo_client)
                    i = NUM_TRIES
                }
            })
    }
}


const App = () => {

    function Handle_Background_Image(bg: string) {
        Set_Background_Image(`data:image/jpeg;base64,${bg}`)
    }

    const [apollo_client, Set_Apollo_Client] = useState<ApolloClient<any>>(new ApolloClient({ cache: new InMemoryCache() }))
    const [background_image, Set_Background_Image] = useState<string>("")

    useEffect(() => {
        Initialize_Apollo(Set_Apollo_Client)
    }, [])

    const background_style = {
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
    }

    return (
        <ApolloProvider client={apollo_client}>
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
        </ApolloProvider>
    )
}
export default App
