import type { MovieData } from '@/types';
import style from './movie-item.module.css';
import Link from 'next/link';

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.contaier}>
      <img src={posterImgUrl} alt={title} className={style.img} />
    </Link>
  );
}
