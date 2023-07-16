export interface MovieSearchResult {
    Search?: Array<Movie>,
    totalResults?: string,
    Error?: string
    Response: "True" | "False"
}

export interface Movie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}