// MovieCard.js

'use client';

import { useRouter } from 'next/navigation';
import { Movie } from "@/types/movie";
import StartRating from "../StarRating/starRating";
import './movieCard.scss';
import { useState } from 'react';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

export interface MovieCardProps {
    movie: Movie;
    variant?: "popular" | "new";
}

export default function MovieCard({ movie, variant }: MovieCardProps) {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const router = useRouter();

    const handleDetails = () => {
        router.push(`/movieDetails/${movie.id}`);
    };

    return (
        <li className={`movie-card ${isImageLoaded ? 'loaded' : 'loading'}`}>
            
            {/* O SkeletonCard só aparece quando a imagem ainda não carregou */}
            {!isImageLoaded && <SkeletonCard />}

            {/* A imagem real carrega em segundo plano e só fica visível quando pronta.
                O restante do conteúdo depende dela. */}
            <div 
                className="card-content-wrapper" 
                style={{ visibility: isImageLoaded ? 'visible' : 'hidden' }}
                onClick={handleDetails} // Adicionado o clique aqui para abranger todo o card
            >
                <div className='movie-poster'>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title}
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setIsImageLoaded(true)} // Também trata casos de erro na imagem
                    />
                </div>
                <div className='movie-infos'>
                    <h2 className='movie-title'>
                        {movie.title}
                    </h2>
                    {movie.vote_average > 0 && 
                        <StartRating 
                            rating={movie.vote_average}
                        />
                    }
                    <div className='hidden-content'>
                    </div>
                </div>
            </div>
        </li>
    );
}