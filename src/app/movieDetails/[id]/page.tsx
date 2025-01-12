'use client';

import { useParams } from 'next/navigation';
import './page.scss';
import React from 'react';
import  StartRating  from '../../../components/StarRating/starRating';
import useMovieDetails from '@/hooks/useMovieDetails';

export default function MovieDetails() {
    const { id } = useParams();
    const { movie, trailer, loading, error } = useMovieDetails(id);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <div className="movie-details-page">
            {movie && (
                <div className="content">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <div className="details-content">
                        <h1>{movie.title}</h1>
                        <p className="description-movie">{movie.overview}</p>
                        <p><strong>Data de lançamento:</strong> {movie.release_date}</p>
                        <p><strong>Duração:</strong> {movie.runtime} minutos</p>
                        <p><strong>Gêneros:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Nota:</strong> {movie.vote_average}</p>
                        <StartRating rating={movie.vote_average} />
                    </div>
                </div>
            )}
            {trailer && (
                <div className="trailer-container">
                    <iframe
                        src={trailer} // trailer já estará no formato embed
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className='iframe'
                    ></iframe>
                </div>
            )}
        </div>
    );
}

