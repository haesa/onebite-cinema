import { MovieData } from '@/types';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movies';
import style from './index.module.css';

export default function Page() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const router = useRouter();

  const handleSearch = async (q: string) => {
    const movies = await fetchMovies(q);
    setMovies(movies);
  };

  const q = router.query.q;

  useEffect(() => {
    if (q) {
      handleSearch(q as string);
    }
  }, [q]);

  return (
    <div className={style.search_results}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
