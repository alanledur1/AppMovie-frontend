import { useEffect, useState } from "react"
import axios from "axios";
import { Movie } from "@/types/movie";

export default function useMovieDetails (movieId: string | string[] | undefined) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [trailer, setTrailer] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => { 
        if (typeof movieId === "string") {
            getMovieDetails(movieId);
            getMovieTrailer(movieId);
        } else if (movieId) {
            setError(new Error("Invalid movie Id format"));
            setLoading(false);
        }
    }, [movieId]);

    const getMovieDetails = async (id: string | string[]) => {
        if (typeof id === "string") {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        language: 'pt-BR'
                    },
                });
                // Se a requisição for bem-sucedida, define o estado do filme para os dados da resposta
                setMovie(response.data);
            } catch (err) {
                // Se houver um erro, define o estado de erro para o erro capturado
                setError(err as Error);
            } finally {
                // Define loading como false quando a requisição é finalizada
                setLoading(false);
            }
        } else {
            setError(new Error);
        }
    };

    // Função para obter o trailer do filme
    const getMovieTrailer = async (id: string) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR',
                },
            });

            const videos = response.data.results;
            // Filtra o trailer oficial (geralmente do tipo 'Trailer' e site 'YouTube')
            const officialTrailer = videos.find(
                (video: { type: string; site: string }) =>
                    video.type === "Trailer" && video.site === "YouTube"
            );

            if (officialTrailer) {
                // Construa o URL do embed do YouTube
                setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
            } else {
                setTrailer(null);
            }
        } catch (err) {
            setError(err as Error);
        }
    };


    return { movie, trailer, loading, error };
}