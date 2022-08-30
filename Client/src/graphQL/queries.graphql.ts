import { gql } from "@apollo/client"


export const Get_Items = gql`
    query Get_Items {
        Items {
            id
            title
            subtitle
            description
        }
    }
`

export const Get_Technologies = gql`
query Get_Technologies($item_id: String!) {
    Technologies (itemId: $item_id) {
        id
        url
        title
    }
}
`

export const Get_Images = gql`
    query Get_Images($item_id: String!) {
        Images (itemId: $item_id) {
            id
            encoded
            description
            rows
            cols
        }
    }
`

export const Get_Contents = gql`
    query Get_Contents($item_id: String!) {
        Contents (itemId: $item_id) {
            id
            title
            text
            links
        }
    }
`

export const Get_JWT = gql`
    query Get_JWT {
        JWT {
            token
        }
    }
`