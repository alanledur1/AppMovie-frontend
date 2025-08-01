'use client';

import SerieCard from "@/components/SerieCard/serieCard";
import { Serie } from "@/types/serie";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import Link from 'next/link';
import './carouselSeries.scss';
import { useRouter } from "next/navigation";

interface SeriesCarouselProps {
    serie: Serie[];
    limit?: number; // Número de séries a serem exibidas inicialmente no carrossel. Default: 5.
    totalLimit?: number; // Número máximo de séries a serem exibidas. Default: 20.
}

export default function CarouselSeries({ serie, limit = 5, totalLimit = 20 }: SeriesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLimit, setVisibleLimit] = useState(limit);
    const [itemsPerPage, setItemPerPage] = useState(limit);

    // Checks if there are more items available and if the "Show more" button should be displayed
    const hasMoreItems = serie.length > visibleLimit;

    const router = useRouter();

    const handleDetails = (id: number) => {
        router.push(`/serieDetails/${id}`);
    };

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
            prevIndex + 1 >= serie.length ? prevIndex : prevIndex + 1
        );
    };


    // Calculates the final index of the visible items
    const visibleSeries = serie.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <div className="serie-carousel">
            <button className="carousel-control left" onClick={handlePrev} disabled={currentIndex === 0}>
                <FaArrowLeft />
            </button>

            <div className="carousel-content">
                {visibleSeries.map((serieItem) => (
                    <div
                        key={serieItem.id}
                        onClick={() => handleDetails(serieItem.id)}
                        style={{ cursor: "pointer" }}    
                    >
                        <SerieCard serie={serieItem}/>
                    </div>
                ))}
            </div>
            <button className="carousel-control right" onClick={handleNext} disabled={currentIndex + itemsPerPage >= serie.length}>
                <FaArrowRight />
            </button>
            {hasMoreItems && visibleLimit < totalLimit && (
                <div className="more-button-wapper">
                    <a href="/series" className="more-button">
                        <FaPlus />
                        <span>Ver mais</span>
                    </a>
                </div>
            )}
        </div>
    );
}
