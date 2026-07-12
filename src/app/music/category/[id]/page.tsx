'use client';

import styles from '../../main/page.module.css';
import Nav from '../../../components/Nav/Nav';
import CenterBlock from '../../../components/CenterBlock/CenterBlock';
import SideBar from '../../../components/SideBar/SideBar';
import { useEffect, useState } from 'react';
import {
  getAllTracks,
  getSelection,
  getTracksByIds,
} from '../../../tracks/tracksApi';
import { TrackType } from '@/src/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/src/store/store';
import { getCategories } from '@/src/store/features/categorySlice';

export default function Category() {
  const params = useParams<{ id: string }>();
  const {allTracks, fetchIsLoading} = useAppSelector((state) => state.tracks);
  const id = params.id;
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [errorRes, setErrorRes] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if(!fetchIsLoading && allTracks.length > 0){
      getCategories(id)
      .then((res) => {
        const category = res.data;

    console.log('CATEGORY:', category);
    const tracksIds = category.items;
    console.log('TRACKS IDS:', tracksIds);

    console.log('ALL TRACKS:', allTracks);
    console.log('TRACK IDS IN ALL TRACKS:', allTracks.map(t => t._id));


    const resultTracks = allTracks.filter((el) =>
      tracksIds.includes(el._id)
    );

    console.log('RESULT TRACKS:', resultTracks);

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
  }, [fetchIsLoading]);

  return (
    <>
        <main className={styles.main}>
          {error && <div>{error}</div>}
          <Nav />
          <CenterBlock
            errorRes={errorRes}
            tracks={tracks}
            isLoading={fetchIsLoading && isLoading}
            title={title}
          />
          <SideBar />
        </main>
      </>
  );
}
