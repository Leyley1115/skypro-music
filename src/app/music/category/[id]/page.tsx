'use client';

import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import { useEffect, useState } from 'react';
import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/src/store/store';
import { getCategories } from '@/src/store/features/categorySlice';


export default function Category() {
  const params = useParams<{ id: string }>();
  const {allTracks, fetchIsLoading, fetchError, favoriteTracks} = useAppSelector((state) => state.tracks);
  const id = params.id;
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [errorRes, setErrorRes] = useState<string | null>(null);
  const { access } = useAppSelector((state) => state.auth);
  const isAuth = Boolean(access && access.trim().length > 0);

  useEffect(() => {
    setIsLoading(true);
    if (id === 'myplaylist') {
      if(isAuth){
        
      setTitle('Мой плейлист');
      setTracks(favoriteTracks);
      setIsLoading(false);
      return;
      }
    }

    if(!fetchIsLoading && allTracks.length){
      getCategories(id)
      .then((res) => {
        const category = res.data;

    const tracksIds = category.items;
    const resultTracks = allTracks.filter((el) =>
      tracksIds.includes(el._id)
    );

    setTitle(category.name);
    setTracks(resultTracks);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorRes(error.response.data);
          } else if (error.request) {
            setErrorRes('Ошибка вышла');
          }
        } else {
          setErrorRes(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [fetchIsLoading, favoriteTracks]);

  return (
    <>
          {error && <div>{error}</div>}
          <CenterBlock
            errorRes={errorRes || fetchError}
            tracks={tracks}
            isLoading={fetchIsLoading && isLoading}
            title={title}
          />
    </>
  );
}
