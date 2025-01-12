'use client';

import './home.scss';
import MovieCarousel from "../CarouselsHome/CarouselMoviesL/movieCarousel";
import MoviesPopular from "../CarouselsHome/CarouselMoviesP/movieCarouselP";
import CarouselSeries from "../CarouselsHome/CarouselSeries/carouselSeries";
import useMedia from '@/hooks/useMedia';
import useSerie from '@/hooks/useSeries';
import Loading from '../Loading/loading';

export default function Home(): JSX.Element {
    // Chamando filmes populares
    const { movies: popularMovies, isLoading: isLoadingMovies, error: errorMovies } = useMedia({ category: "popular" });
    
    // Chamando lançamentos recentes
    const { movies: newMovies, isLoading: isLoadingNewMovies, error: errorNewMovies } = useMedia({ category: "new" });

    // Chamando séries populares
    const { series: popularSeries, isLoading: isLoadingSeries, error: errorSeries } = useSerie();


    // Verificando estados de carregamento e erro
    if (isLoadingMovies || isLoadingNewMovies || isLoadingSeries) 
        return <div className='loading-container'> <Loading /> </div>;
    if (errorMovies) return <div>Erro ao carregar filmes populares: {errorMovies.message}</div>;
    if (errorNewMovies) return <div>Erro ao carregar lançamentos: {errorNewMovies.message}</div>;
    if (errorSeries) return <div>Erro ao carregar séries populares: {errorSeries.message}</div>;

    return (
        <section className="home-page">
            {/* Seção de lançamentos */}
            <div className="movies-lan">
                <h1>Lançamentos Recentes</h1>
                <MovieCarousel movies={newMovies} />
            </div>

            {/* Seção de filmes populares */}
            <div className="movies-pop">
                <h2>Filmes Populares</h2>
                <MoviesPopular movie={popularMovies} />
            </div>

            {/* Seção de séries populares */}
            <div className="series">
                <h2>Séries Populares</h2>
                <CarouselSeries serie={popularSeries} limit={5}/>
            </div>
        </section>
    );
}
