"use client";

import { SecondSection } from "@/app/types/about";
import Image from "next/image";
import { useRef, useState } from "react";

export default function VideoSection({ data }: { data: SecondSection }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const hasVideo = Boolean(data.video);

  const handlePlay = () => {
    if (!hasVideo) return;
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="relative w-full aspect-video h-[268px] md:h-auto lg:max-h-[700px] 3xl:max-h-[800px] overflow-hidden">
      {/* Poster image — always in DOM, hidden once playing */}
      <Image
        src={data.poster || "/assets/images/placeholder.png"}
        alt={data.posterAlt ?? ""}
        fill
        className={`object-cover object-center transition-opacity duration-500 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video — only rendered if a video exists */}
      {hasVideo && (
        <video
          ref={videoRef}
          src={data.video}
          poster={data.poster || undefined}
          controls={isPlaying}
          playsInline
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      {/* Overlay — hidden once playing */}
      {!isPlaying && <div className="absolute inset-0 bg-black/20" />}

      {/* Play Button — only shown if a video exists and isn't playing yet */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlay}
            className="group w-[50px] h-[50px] md:w-[60px] md:h-[60px] xl:w-[80px] xl:h-[80px] 3xl:w-[100px] 3xl:h-[100px] rounded-full bg-white flex items-center justify-center cursor-pointer"
            aria-label="Play video"
          >
            <Image
              src="/assets/icons/play-primary.svg"
              alt="Play"
              width={14}
              height={19}
              className="play-icon-pulse h-[10px] md:h-[19px] w-auto pointer-events-none"
            />
          </button>
        </div>
      )}
    </section>
  );
}