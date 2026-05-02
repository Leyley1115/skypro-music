'use client';

import styles from './bar.module.css';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { useRef, useState } from 'react';
import { setIsPLay, setCurrentTrack, setNextTrack, setPrevTrack, toogleShuffle } from '@/src/store/features/trackSlice';
import { useEffect } from 'react';
import { formatTime } from '@/src/utils/helper';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progressTrack, setProgressTrack] = useState(0); 
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => setProgressTrack(audio.currentTime);
    audio.addEventListener("timeupdate", update);

    return () => audio.removeEventListener("timeupdate", update);
  }, [currentTrack]);


  if (!currentTrack) return <></>;

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPLay(true));
    }
  };
  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPLay(false));
    }
  };

  const onToogleLoop = () => {
    return setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef) {
      const time = `${formatTime(Number(audioRef.current?.currentTime))}` +
          `/` +
          `${formatTime(Number(audioRef.current?.duration))}`
      return time
    }
  };

  const onLoadMetadata = () => {
    console.log('Start');
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPLay(true));
      setIsLoadedTrack(true);
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  }

  const nextTrack = () => {
    dispatch(setNextTrack());
  };

  const prevTrack = () => {
    dispatch(setPrevTrack());
  }

  const onToogleShuffle = () => {
    dispatch(toogleShuffle());
  }

  return (
    <div className={styles.bar}>
      <audio
        src={currentTrack?.track_file}
        ref={audioRef}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadMetadata}
        onEnded={nextTrack}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar 
          max={Number(audioRef.current?.duration) || 0} 
          step={0.1} 
          readOnly={!isLoadedTrack} 
          value={progressTrack} 
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div 
                className={styles.player__btnPrev}
                onClick={prevTrack}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="./img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div
                className="player__btnPlay btn"
                onClick={() => {
                  !isPlay ? playTrack() : pauseTrack();
                }}
              >
                {!isPlay && (
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-play"></use>
                  </svg>
                )}
                {isPlay && (
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                )}
              </div>

              <div 
                className={styles.player__btnNext}
                onClick={nextTrack}
              >
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="./img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div className="player__btnRepeat btnIcon" onClick={onToogleLoop}>
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="./img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div className="player__btnShuffle btnIcon" onClick={onToogleShuffle}>
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="./img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>

                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>

                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div className="player__btnShuffle btnIcon">
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>

                <div className="trackPlay__dislike btnIcon">
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="./img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="./img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>

              <div className="volume__progress btn">
                <input
                  className="volume__progressLine btn"
                  type="range"
                  name="range"
                  value={volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (audioRef.current){
                      audioRef.current.volume=Number(e.target.value)/100;
                    }
                  }}
                />
              </div>
            </div> 
            <p style={{paddingLeft: '30px'}}>{onTimeUpdate()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
