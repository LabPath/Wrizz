export interface Listing<T> {
    data: {
        modhash: string
        dist: number
        children: T[]
        after: string | null
        before: string | null
    }
}

export interface Post {
    data: {
        title: string
        id: string
        permalink: string
        url: string
        created_utc: number
        created: number
        author: string
    }
}

export interface File {
    name: string
    path: string
    download_url: string
    html_url: string
}