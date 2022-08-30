import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@fontsource/iosevka"
import "./styles"
import { CookiesProvider } from "react-cookie"


export interface Item {
    id: string
    title: string
    subtitle: string
    description: string
}

export interface Technology {
    id: string
    title: string
    url: string
}

export interface Content {
    id: string
    title: string
    text: string
    links: string
}

export interface ImageContent {
    id: string
    encoded: string
    description: string
    rows: number
    cols: number
}


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </React.StrictMode>
)
