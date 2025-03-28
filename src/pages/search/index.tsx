import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import movies from '@/mock/movies.json';
import MovieItem from '@/components/movie-item';
import style from './index.module.css';

const searchResults = movies.slice(0, 3);

export default function Page() {
  return (
    <div className={style.search_results}>
      {searchResults.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
