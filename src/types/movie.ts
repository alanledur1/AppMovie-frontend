export interface Movie {
    id: number,
    title: string,
    poster_path: string,
    overview: string,
    vote_average: number,
    release_date: string,
    runtime: number,
    genres: { id: number, name: string }[]
};