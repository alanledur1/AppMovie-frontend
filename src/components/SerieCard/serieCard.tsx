import { Serie } from "@/types/serie";
import StartRating from "../StarRating/starRating";
import './serieCard.scss';
import { useRouter } from 'next/navigation'; // Importação correta
import { useState } from 'react';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

export interface SerieCardProps {
    serie: Serie;
    className?: string; // Propriedade para adicionar classes extras, se necessário
}

export default function SerieCard({ serie, className }: SerieCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const router = useRouter();

    const handleDetails = () => {
        router.push(`/serieDetails/${serie.id}`)
    }
    return (
        <li className={`serie-card ${isImageLoaded ? 'loaded' : 'loading'}`}>
            {!isImageLoaded && <SkeletonCard />}
            <div
                className="card-content-wrapper"
                style={{ visibility: isImageLoaded ? 'visible' : 'hidden' }}
                onClick={handleDetails} // Adicionado o clique aqui para abranger todo o card
            >
                <div className="serie-poster">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                        alt={serie.name}
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setIsImageLoaded(true)}
                    />
                </div>
                <div className="serie-infos">
                    <h2 className="serie-title">
                        {serie.name}
                    </h2>
                    {serie.vote_average > 0 &&
                        <StartRating
                            rating={serie.vote_average}
                        />
                    }
                </div>
            </div>
        </li>
    );
}
