'use client';

import { TrackType } from '@/src/sharedTypes/sharedTypes';
import styles from './track.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { formatTime } from '@/src/utils/helper';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { setCurrentPlaylist, setCurrentTrack } from '@/src/store/features/trackSlice';

type trackTypeProp = {
  track: TrackType;
  playlist: TrackType[];
};

export default function Track({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
  };
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isCurrent = currentTrack?._id === track._id;

  return (
    <div className={styles.playlist__item} onClick={onClickTrack}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div className={styles.track__titleImage}>
            {!isCurrent && (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="./img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
            {isCurrent && (
              <div
                className={classNames(styles['playing-dot'], {
                  [styles.animate]: isPlay,
                })}
              ></div>
            )}
          </div>
          <div className={styles['track__title-text']}>
            <Link className={styles.track__titleLink} href="">
              {track.name}
              <span className={styles.track__titleSpan}></span>
            </Link>
          </div>
        </div>

        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>

        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>

        <div className={styles.track__time}>
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="./img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
