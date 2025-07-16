'use client';

import useSerie from '@/hooks/useSeries';
import SerieCard from '../SerieCard/serieCard';
import Loading from '../Loading/loading';
import { useState, useEffect, useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import './serieList.scss';

export default function SerieList() {
    const { series, isLoading } = useSerie();
    const [currentPage, setCurrentPage] = useState(1);
    const serieListRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // Verifica se a referência existe para rolar a tela para o topo da lista
        if (serieListRef.current) {
            serieListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [currentPage]); // O efeito é acionado sempre que a página atual muda

    if (isLoading) {
        return (
            <div className='loading-container'>
                <Loading />
            </div>
        )  // return loading spinner until data is fetched and mapped into cards.  // replace 'spinningBubbles' with desired loading type.  // adjust color and dimensions as needed.  // replace '#123456' with your desired loading spinner color.  // replace '80' with your desired loading spinner height and width.  // replace 'SerieCard' with your actual serie card component.  // replace 'key={serie.id}' with your actual serie id prop.  // replace 'language: 'pt-BR'' with your desired language code.  // replace 'e5edd846266d0cedfd3f5cdfe579da45' with your actual API
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
    const totalPages = Math.ceil(series.length / 40);

    const handleNextChange = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }

    const handlePrevChange = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const indexOfLastSerie = currentPage * 40;
    const indexOfFirstSerie = indexOfLastSerie - 40;
    const currentSerie = series.slice(indexOfFirstSerie, indexOfLastSerie);



    return (
        <div>
            <ul className="serie-list" ref={serieListRef}>
                {currentSerie.map(serie =>
                    <SerieCard
                        key={serie.id}
                        serie={serie}
                    />
                )}
            </ul>
            <div className='serie-radio'>
                <div className='radio-input'>
                    <label>
                        <button onClick={handlePrevChange} disabled={currentPage === 1}><FaAngleLeft /></button>
                    </label>
                    {getPaginationGroup().map((item, index) => (
                        <label key={index}>
                            {typeof item === 'string' ? (
                                <span>{item}</span>
                            ) : (
                                <>
                                    <input
                                        value={`value-${item}`}
                                        type="radio"
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
                        <button onClick={handleNextChange} disabled={currentPage === totalPages}><FaAngleRight /></button>
                    </label>
                </div>
            </div>
        </div>
    )
}