import { useEffect, useState } from "react"
import axios from "axios";
import { Serie } from "@/types/serie";


export default function useSerieDetails (serieId: string | string[] | undefined) {
    const [serie, setSerie] = useState<Serie | null>(null);
    const [seasons, setSeasons] = useState<Serie | null>(null);
    const [trailer, setTrailer] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => { 
        if (typeof serieId === "string") {
            getSerieDetails(serieId);
            getSerieTrailer(serieId);
        } else if (serieId) {
            setError(new Error("Invalid serie id format"));
            setLoading(false);
        }
    }, [serieId]);

    const getSerieDetails = async (id: string) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR'
                },
            });
            
            const serieData = response.data;
            setSerie(serieData);
            setSeasons(serieData.seasons);
        } catch (err) {
            // Se houver um erro, define o estado de erro para o erro capturado
            setError(err as Error);
        } finally {
            // Define loading como false quando a requisição é finalizada
            setLoading(false);
        }
    }

    // Função para obter o trailer das séries
    const getSerieTrailer = async (id: string) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, {
                params: {
                    api_key: process.env.NEXT_PUBLIC_API_KEY,
                    language: 'pt-BR'.replace,
                },
            });

            const videos = response.data.results;
            // Filtra o trailer oficial (geralmente do tipo 'Trailer' e site 'YouTube')
            const officialTrailer = videos.find(
                (video: { type: string; site: string }) => 
                    video.type === "Trailer" && video.site === "YouTube"
            );

            if (officialTrailer) {
                // Construa a URL do embed do YouTube
                setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
            } else {
                setTrailer(null);
            }
        } catch (err) {
            setError(err as Error);
        }
    };

    return { serie, seasons, trailer, loading, error };
}