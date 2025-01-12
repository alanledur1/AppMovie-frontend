export interface Season {
    season_number: number;
    episode_count: number;
    air_date: string;
    name: string;
    overview: string;
    poster_path: string | null;
};

export interface Serie {
    id: number;
    name: string; // Corrigido de 'title' para 'name', já que séries usam 'name'
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    genres: { id: number, name: string }[];
    seasons: Season[]; // Incluímos a lista de temporadas
};