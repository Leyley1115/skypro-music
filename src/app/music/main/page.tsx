'use client';

import CenterBlock from '../../components/CenterBlock/CenterBlock';
import { useAppSelector } from '@/src/store/store';

export default function Home() {
  const {fetchError, fetchIsLoading, allTracks} = useAppSelector((state) => state.tracks);

  return (
    <>
          <CenterBlock 
          tracks={allTracks} 
          isLoading={fetchIsLoading}
          errorRes={fetchError}
          title={'Треки'}
          />
    </>
  );
}
