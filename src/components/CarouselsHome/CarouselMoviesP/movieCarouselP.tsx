'use client';

import { Movie } from "@/types/movie";
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa6";
import './movieCarouselP.scss';
import MovieCard from "@/components/MovieCard/movieCard";

interface MovieCarouselProps {
    movie: Movie[];
    limit?: number; // Número de filmes a serem exibidos inicialmente no carrossel. Default: 5.
    totalLimit?: number; // Número máximo de filmes a serem exibidos. Default: 20.
}


export default function MoviesPopular({movie, limit = 5, totalLimit = 10 }: MovieCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLimit, setVisibleLimit] = useState(limit);
    const [itemsPerPage, setItemPerPage] = useState(limit);


    // Checks if there are more items available and if the "Show more" button should be displayed
    const hasMoreItems = movie.length > visibleLimit;

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
            prevIndex === 0? 0 : prevIndex - 1
        );
    };
    
    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + limit >= movie.length ? prevIndex : prevIndex + 1
        );
    };


    // Calculates the final index of the visible items
    const visibleMoviesPopular = movie.slice(currentIndex, currentIndex + itemsPerPage);

    
    return(
        <div className="movie-carouselP">
            <button
                className="carousel-control left"
                onClick={handlePrev}
                disabled={currentIndex === 0}
            >
                <FaArrowLeft />
            </button>
            <div className="carousel-content">
                {visibleMoviesPopular.map((movieItem) => (
                    <MovieCard key={movieItem.id} movie={movieItem} />
                ))}
                {hasMoreItems && visibleLimit < totalLimit && (
                    <button className="more-button">
                        <a href="/filmes">
                            <FaPlus />
                            Ver mais
                        </a>
                    </button>
                )}
            </div>
            <button
                className="carousel-control right"
                onClick={handleNext}
                disabled={currentIndex + itemsPerPage >= movie.length}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}