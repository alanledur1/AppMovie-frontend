'use client';

import { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/movieCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Loading from '../Loading/loading';
import useMovies from '@/hooks/useMedia';
import './movieList.scss';

export default function MovieList() {
    const { movies = [], isLoading } = useMovies({ category: 'popular' }); // Chamando o hook com a categoria popular
    const [currentPage, setCurrentPage] = useState(1);
    const movieListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // Verifica se a referência existe para rolar a tela para o topo da lista
        if (movieListRef.current) {
            movieListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]); // O efeito é acionado sempre que a página atual muda

    if (isLoading) {
        return (
            <div className='loading-container'>
                <Loading />
            </div>
        );
    }

    const getPaginationGroup = () => {
        let start = Math.floor(currentPage - 1) / 5 * 5;
        let end = start + 5;
        if (end > totalPages) {
            end = totalPages;
        }
        const pageNumbers = [];
        for (let i = start + 1; i <= end; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

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



    return (
        <div>
            <ul className='movie-list' ref={movieListRef}>
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
                        <button onClick={handlePrevChange} disabled={currentPage === 1}> <FaAngleLeft /> </button>
                    </label>

                    {/* MUDANÇA: Use a nova função para renderizar os botões */}
                    {getPaginationGroup().map((item, index) => (
                        <label key={index}>
                            {typeof item === 'string' ? (
                                <span>{item}</span>
                            ) : (
                                <>
                                    <input
                                        value={`value-${item}`}
                                        type='radio'
                                        name='page'
                                        checked={currentPage === item}
                                        onChange={() => setCurrentPage(item)}
                                    />
                                    <span>{item}</span>
                                </>
                            )}
                        </label>
                    ))}

                    <label>
                        <button onClick={handleNextChange} disabled={currentPage === totalPages}> <FaAngleRight /> </button>
                    </label>
                </div>
            </div>
        </div>
    );
}
