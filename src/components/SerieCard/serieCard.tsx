import { Serie } from "@/types/serie";
import StartRating from "../StarRating/starRating";
import './serieCard.scss';
import { useRouter } from 'next/navigation'; // Importação correta

export interface SerieCardProps {
    serie: Serie;
    className?: string; // Propriedade para adicionar classes extras, se necessário
}

export default function SerieCard({ serie, className }: SerieCardProps) {
    const router = useRouter();

    const handleDetails = () => {
        router.push(`/serieDetails/${serie.id}`)
    }
    return (
        <li className={`serie-card ${className}`}>
            <div className="serie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} 
                    alt={serie.name} // Ajustado para "name"
                />
            </div>
            <div className="serie-infos">
                <h2 className="serie-title">
                    {serie.name} {/* Ajustado para "name" */}
                </h2>

                {serie.vote_average > 0 &&
                    <StartRating 
                        rating={serie.vote_average}
                    />
                }

                <div className="hidden-content">
                    {serie.overview && 
                        <p className="description">
                            {serie.overview.length > 100
                                ? `${serie.overview.substring(0, 100)}...`
                                : serie.overview}
                        </p>
                    }

                    <button className="btn-default" onClick={handleDetails}>
                        Ver mais
                    </button>
                </div>
            </div>
        </li>
    );
}
