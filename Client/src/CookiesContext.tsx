import { ApolloProvider, ApolloClient, ApolloQueryResult, DocumentNode, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import React, { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import App from "./App"
import { COOKIE_NAME, GET_TOKEN, NUM_TRIES, SERVER_URL } from "./config"
import { Get_Items, Get_JWT } from "./graphQL/queries.graphql"

const CookiesContext = () => {

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

    function Initialize_Apollo(
        cookies: { [COOKIE_NAME]?: string },
        Set_Cookies: (name: any, value: any) => void,
        Set_Apollo_Client: any
    ) {

        if (cookies && typeof cookies[COOKIE_NAME] === "string") {
            const apollo_client: ApolloClient<any> = new ApolloClient({
                uri: SERVER_URL,
                cache: new InMemoryCache(),
                headers: {
                    "Authorization": "Bearer " + cookies[COOKIE_NAME],
                    "Access-Control-Allow-Origin": SERVER_URL,
                },
            })
            Get_Query(apollo_client, Get_Items)
                .then((query_response) => {
                    if (typeof query_response === "number") {
                        if (query_response === 401)
                            Reconnect_Apollo(Set_Cookies, Set_Apollo_Client)
                    } else {
                        Set_Apollo_Client(apollo_client)
                    }
                })
        } else
            Reconnect_Apollo(Set_Cookies, Set_Apollo_Client)
    }

    async function Reconnect_Apollo(
        Set_Cookies: (name: any, value: any) => void,
        Set_Apollo_Client: any
    ) {

        let i: number = 0
        let local_client
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

                        local_client = new ApolloClient({
                            uri: SERVER_URL,
                            cache: new InMemoryCache(),
                            headers: { "Authorization": "Bearer " + new_jwt },
                        })
                        Set_Apollo_Client(local_client)
                        i = NUM_TRIES
                    }
                })
            Set_Apollo_Client(local_client)
        }
    }

    const [cookies, Set_Cookies] = useCookies([COOKIE_NAME])
    const [apollo_client, Set_Apollo_Client] = useState<ApolloClient<any>>(new ApolloClient({ cache: new InMemoryCache() }))
    useEffect(() => {
        Initialize_Apollo(cookies, Set_Cookies, Set_Apollo_Client)
    }, [])

    return (
        <ApolloProvider client={apollo_client}>
            <App />
        </ApolloProvider>
    )
}

export default CookiesContext