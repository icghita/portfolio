import { CssBaseline, Box } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import { BackgroundPanel, NavigationButtons, Footer } from "./components"
import { global_theme } from "./styles"
import { background_image } from "./assets"
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject, DocumentNode, ApolloQueryResult } from "@apollo/client"
import { SERVER_URL, GET_TOKEN, NUM_TRIES, COOKIE_NAME } from "./config"
import { Get_Items, Get_JWT } from "./graphQL/queries.graphql"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"


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
    cookies: { [COOKIE_NAME]?: string },
    Set_Cookies: (name: any, value: any) => void,
    Set_Apollo_Provider: React.Dispatch<React.SetStateAction<ApolloClient<any>>>
) {

    if (cookies && typeof cookies[COOKIE_NAME] === "string") {
        const apollo_client: ApolloClient<any> = new ApolloClient({
            uri: SERVER_URL,
            cache: new InMemoryCache(),
            headers: { "Authorization": "Bearer " + cookies[COOKIE_NAME] },
        })
        Get_Query(apollo_client, Get_Items)
            .then((query_response) => {
                if (typeof query_response === "number") {
                    if (query_response === 401)
                        Reconnect_Apollo(Set_Cookies, Set_Apollo_Provider)
                } else {
                    Set_Apollo_Provider(apollo_client)
                }
            })
    } else
        Reconnect_Apollo(Set_Cookies, Set_Apollo_Provider)
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

    const [cookies, Set_Cookies] = useCookies([COOKIE_NAME])
    const [apollo_client, Set_Apollo_Client] = useState<ApolloClient<any>>(new ApolloClient({ cache: new InMemoryCache() }))

    useEffect(() => {
        Initialize_Apollo(cookies, Set_Cookies, Set_Apollo_Client)
    }, [])

    return (
        <ApolloProvider client={apollo_client}>
            <CssBaseline>
                <ThemeProvider theme={global_theme}>
                    <Box sx={background}>
                        <NavigationButtons />
                        <BackgroundPanel />
                        <Footer />
                    </Box>
                </ThemeProvider>
            </CssBaseline >
        </ApolloProvider>
    )
}
export default App

const background: object = {
    backgroundImage: `url(${background_image})`,
    padding: "0px",
    width: "auto",
    height: "auto",
    minWidth: "100vw",
    minHeight: "100vh",
    position: "relative",
}
