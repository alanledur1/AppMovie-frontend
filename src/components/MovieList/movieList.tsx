'use client';

import { useState } from 'react';
import MovieCard from '../MovieCard/movieCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Loading from '../Loading/loading';
import useMovies from '@/hooks/useMedia';
import './movieList.scss';

export default function MovieList() {
    const { movies = [], isLoading } = useMovies({ category: 'popular' }); // Chamando o hook com a categoria popular
    const [currentPage, setCurrentPage] = useState(1);

    // Certificando que 'movies' existe antes de calcular o número de páginas
    const totalPages = Math.ceil(movies.length / 40);

    const handleNextChange = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    const handlePrevChange = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastMovie = currentPage * 40;
    const indexOfFirstMovie = indexOfLastMovie - 40;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    if (isLoading) {
        return (
            <div className='loading-container'>
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <ul className='movie-list'>
                {currentMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </ul>
            <div className='movie-radio'>
                <div className='radio-input'>
                    <label>
                        <button onClick={handlePrevChange} disabled={currentPage === 1}> <FaAngleLeft/> </button>
                    </label>
                    {[...Array(totalPages)].map((_, index) => (
                        <label key={index}>
                            <input 
                                value={`value-${index + 1}`}
                                type='radio' 
                                name='page' 
                                checked={currentPage === index + 1} 
                                onChange={() => setCurrentPage(index + 1)}
                            />
                            <span>{index + 1}</span>
                        </label>
                    ))}
                    <label>
                        <button onClick={handleNextChange} disabled={currentPage === totalPages}> <FaAngleRight/> </button>
                    </label>
                </div>
            </div>
        </div>
    );
}
