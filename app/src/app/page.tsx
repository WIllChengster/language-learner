'use client';
import { useCallback, useEffect, useRef, useState } from "react";

import { findPinyinByHanzi, findSubtitleByTime } from './utils';

import nativeJson from './translations/native.json';
import englishJson from './translations/english.json';

/**
 * TODOS:
 * - make hanzi and pinyin in the same column for easier reading 
 */

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nativeSubtitle, setNativeSubtitles] = useState<string[]>([]);
  const [pinyinSubtitle, setPinyinSubtitles] = useState<string[]>([]);

  const [englishSubtitle, setEnglishSubtitles] = useState<string>();

  useEffect(() => {
    // Update pinyin subtitles whenever native subtitles change
    const pinyin = nativeSubtitle.map(findPinyinByHanzi);
    setPinyinSubtitles(pinyin);
  }, [nativeSubtitle])

  const timeUpdateHandler = useCallback(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      console.log(videoElement.currentTime);

      setNativeSubtitles(findSubtitleByTime(nativeJson, videoElement.currentTime).split(''));
      setEnglishSubtitles(findSubtitleByTime(englishJson, videoElement.currentTime));
    }
  }, [videoRef]);


  useEffect(() => {
    const videoElement = videoRef.current;
    // change volume to zero so I don't destroy my ears
    if (videoElement) {
      videoElement.volume = 0;
    }

    if (videoElement) {
      videoElement.addEventListener('timeupdate', timeUpdateHandler);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', timeUpdateHandler);
      }
    };
  }, [videoRef]);

  const getSubtitleComponentMap = () => {
    return nativeSubtitle.map((char, index) => {
      return (<div key={index} className="p-2 text-center text-2xl">
        <p>{char}</p>
        <p>{pinyinSubtitle[index]}</p>
      </div>)
    })
  }

  return (
    <div>
      <video controls ref={videoRef} >
        <source src="zh.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='flex'>
          {getSubtitleComponentMap()}
      </div>
      <p className='text-2xl'>
        {englishSubtitle}
      </p>
    </div>
  );
}
