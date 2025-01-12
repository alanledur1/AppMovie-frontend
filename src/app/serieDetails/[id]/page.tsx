'use client';

import { useParams } from 'next/navigation';
import './page.scss';
import React, { useState } from 'react';
import StartRating from '../../../components/StarRating/starRating';
import useSerieDetails from '@/hooks/useSerieDetails';
import { Season } from '@/types/serie';

export default function SerieDetails() {
    const { id } = useParams(); // Use useParams para obter o parâmetro da URL
    const { serie, seasons, trailer, loading, error } = useSerieDetails(id);

    const [showSeasons, setShowSeasons] = useState(false);

    if (loading) return <div>Carregando...</div>;

    if (error) {
        return (
            <div>
                <h2>Erro ao carregar os detalhes da série</h2>
                <p>{error.message || "Ocorreu um erro inesperado."}</p>
            </div>
        );
    }

    return (
        <div className="serie-details-page">
            {serie && (
                <div className='content'>
                    <img
                        src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                        alt={serie.name}
                    />
                    <div className='details-content'>
                        <h1>{serie.name}</h1>
                        <p className='description-serie'>{serie.overview}</p>
                        <p><strong>Data de lançamento:</strong> {serie.release_date}</p>
                        <p><strong>Temporadas:</strong> {Array.isArray(seasons) ? seasons.length : 0}</p> {/* Verifique se seasons é um array */}
                        <p><strong>Gêneros:</strong> {serie.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Nota:</strong> {serie.vote_average}</p>
                        <StartRating rating={serie.vote_average} />
                    </div>
                </div>
            )}

            <div className="container">
                <div className="bottom-content">
                    {Array.isArray(seasons) && seasons.length > 0 && (
                        <div className="seasons-section">
                            <button
                                onClick={() => setShowSeasons(!showSeasons)}
                                className="toggle-seasons-button"
                            >
                                {showSeasons ? 'Esconder Temporadas' : 'Ver Temporadas'}
                            </button>

                            {showSeasons && (
                                <div className="seasons-list">
                                    <h2>Temporadas</h2>
                                    <ul>
                                        {seasons.map((season: Season) => (
                                            <li key={season.season_number}>
                                                <strong>Temporada {season.season_number}:</strong> {season.episode_count} episódios
                                                <p><strong>Data de lançamento:</strong> {season.air_date}</p>
                                                <p>{season.overview}</p>
                                                {season.poster_path && (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                                                        alt={season.name}
                                                        className="season-poster"
                                                    />
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="trailer-container">
                    {trailer && (
                        <div className="trailer-content">
                            <iframe
                                src={trailer}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className='iframe'
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
