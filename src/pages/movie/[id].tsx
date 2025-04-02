import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneMovie from '@/lib/fetch-one-movie';
import fetchMovies from '@/lib/fetch-movies';
import style from './[id].module.css';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
  const movies = await fetchMovies();
  const ids = movies.map(({ id }) => ({ params: { id: id.toString() } }));

  return {
    paths: ids,
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
    },
  };
};

export default function Page({
  movie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return 'Loading ...';

  const {
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(', ')} / {runtime}
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div>{description}</div>
    </div>
  );
}
