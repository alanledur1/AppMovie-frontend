'use client';

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './movieCarousel.scss';
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";

interface MovieCarouselProps {
    movies: Movie[];
    limit?: number;
}

export default function MovieCarousel({ movies = [], limit = 10 }: MovieCarouselProps) { // Inicializando movies como um array vazio
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();
    const [itemsPerPage, setItemPerPage] = useState(limit);

    // Calculates the number of items visible on the screen
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth <= 480) {
                setItemPerPage(1); // Shows 1 item at a time on small screens
            } else if (window.innerWidth <= 768) {
                setItemPerPage(2); // Shows 2 items at a time on medium screens
            } else if (window.innerWidth <= 1024) {
                setItemPerPage(3); // Shows 3 items at a time on tablets
            } else {
                setItemPerPage(limit); // Shows the default limit on large screens
            }
        }

        // Calls the function when the window is resized
        window.addEventListener('resize', updateItemsPerPage);

        // Calls the function to set the initial value
        updateItemsPerPage();

        // Cleans up the listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        }
    }, [limit]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? 0 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + itemsPerPage >= movies.length ? prevIndex : prevIndex + 1
        );
    };

    // Calculates the final index of the visible items
    const visibleMovies = movies.slice(currentIndex, Math.min(currentIndex + itemsPerPage, movies.length));
    
    const handleDetails = (id: number) => {
        // Use o ID do filme para criar a rota correta
        router.push(`/movieDetails/${id}`); // Ajuste conforme a estrutura de rotas do seu projeto
    };
    return (
        <div className="movie-carousel">
            <button 
                className="carousel-control left" 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                aria-label="Previous movies"    
            >
                <FaArrowLeft />
            </button>
            <div className="carousel-content">
                {visibleMovies.length > 0 ? (
                    visibleMovies.map((movie) => (
                        <div 
                            key={movie.id} 
                            className="movie-slide" 
                            onClick={() => handleDetails(movie.id)}
                        >
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.jpg'}
                                alt={movie.title || 'No title available'}
                            />
                            <h3>{movie.title}</h3>
                        </div>
                    ))
                ) : (
                    <p>Nenhum filme disponível.</p> // Mensagem quando não há filmes
                )}
            </div>
            <button 
                className="carousel-control right" 
                onClick={handleNext} 
                disabled={currentIndex >= movies.length - limit}
                aria-label="Next movie"
            >
                <FaArrowRight/>
            </button>
        </div>
    ); 
}
