import { useRouter } from 'next/navigation'; // Importação correta
import { Movie } from "@/types/movie";
import StartRating from "../StarRating/starRating";
import './movieCard.scss';

export interface MovieCardProps {
    movie: Movie;
    variant?: "popular" | "new";
}

export default function MovieCard({ movie, variant }: MovieCardProps) {
    const router = useRouter();

    const handleDetails = () => {
        // Use o ID do filme para criar a rota correta
        router.push(`/movieDetails/${movie.id}`); // Ajuste conforme a estrutura de rotas do seu projeto
    };

    return (
        <li className='movie-card'>
            <div className='movie-poster'>
                <img 
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                    alt={movie.title} 
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
                    {movie.overview && 
                        <p className='description'>
                            {movie.overview.length > 100 
                                ? `${movie.overview.substring(0, 100)}...` 
                                : movie.overview}
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
