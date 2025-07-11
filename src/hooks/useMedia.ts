import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/types/movie";

interface UseMoviesProps {
  category: "popular" | "new"; // Define a categoria (popular ou novos lançamentos)
}

export default function useMovies({ category }: UseMoviesProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!category) {
      console.error('A categoria deve ser definida');
      return;
    }
    getMovies();
  }, [category]);

  const getMovies = async () => {
    try {
      let fetchedMovies: Movie[] = [];
      const totalPages = 10; 
      const url = category === "popular"
        ? `https://api.themoviedb.org/3/trending/movie/day`
        : `https://api.themoviedb.org/3/discover/movie`;

      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(url, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            language: "pt-BR",
            page: page,
          },
        });
        fetchedMovies.forEach((movie) => {
          console.log(`Filme: ${movie.title}, Lançado em: ${movie.release_date}`);
        });
        fetchedMovies = [...fetchedMovies, ...response.data.results];
      }

      const uniqueMovies = Array.from(new Map(fetchedMovies.map(movie => [movie.id, movie])).values());

      let finalMovies = uniqueMovies;

      if (category === "new") {
        const currentDate = new Date();
        const trirtyDaysAgo = new Date();
        trirtyDaysAgo.setDate(currentDate.getDate() - 60); // Calcula a data de 30 dias atrás

        fetchedMovies = fetchedMovies.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= trirtyDaysAgo && releaseDate <= currentDate;
        });
      }

      setMovies(finalMovies);
    } catch (err) {
      setError(err as Error);

    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, error };
}
