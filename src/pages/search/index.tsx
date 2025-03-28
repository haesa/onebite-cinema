import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  return q ? <h1>검색 결과: {q}</h1> : null;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
