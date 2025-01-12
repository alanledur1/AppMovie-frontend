import MovieList from "@/components/MovieList/movieList";
import './page.scss';

export default function FilmesPage() {
  return (
    <div>
        <h1 className="movie-title-page">Filmes</h1>
        <MovieList />
    </div>
);
}
