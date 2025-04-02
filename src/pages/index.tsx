import { InferGetStaticPropsType } from 'next';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovie from '@/lib/fetch-random-movies';
import style from './index.module.css';
import Head from 'next/head';

export const getStaticProps = async () => {
  const [allMovies, recommendedMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovie(),
  ]);

  return {
    props: {
      allMovies,
      recommendedMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recommendedMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property='og:image' content='/thumbnail.png' />
        <meta property='og:title' content='한입 시네마' />
        <meta
          property='og:description'
          content='한입 시네마에 등록된 영화들을 만나보세요'
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={style.recommended_movies}>
            {recommendedMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
        <section>
          <h3>등록된 모든 영화</h3>
          <div className={style.all_movies}>
            {allMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
