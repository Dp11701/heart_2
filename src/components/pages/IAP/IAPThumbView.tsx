import { IAPConfig } from "../../models/IAPConfig";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function IAPThumbView(props: { config: IAPConfig }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const videos = [
    "/assets/videos/subscribe5_video1.mp4",
    "/assets/videos/subscribe5_video2.mp4",
    "/assets/videos/subscribe5_video3.mp4",
    "/assets/videos/subscribe5_video4.mp4",
  ];

  // Handle video playback and switching
  useEffect(() => {
    const timer = setTimeout(() => {
      videoRefs.current.forEach((videoEl, index) => {
        if (!videoEl) return;
        if (index === currentVideoIndex) {
          try {
            videoEl.currentTime = 0;
            const playPromise = videoEl.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.log("Video play failed:", error);
              });
            }
          } catch (error) {
            console.log("Video play error:", error);
          }
        } else {
          try {
            videoEl.pause();
          } catch {}
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentVideoIndex]);

  // Handle video end event to switch to next video
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (!currentVideo) return;

    const handleEnded = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
    };

    currentVideo.addEventListener("ended", handleEnded);
    return () => {
      currentVideo.removeEventListener("ended", handleEnded);
    };
  }, [currentVideoIndex, videos.length]);

  const handleDotClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next video
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    } else if (isRightSwipe) {
      // Swipe right - previous video
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
      );
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 70px - 220px)",
        overflow: "hidden",
        borderRadius: "0px",
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Video Container - Full Size */}
      {videos.map((videoSrc, index) => (
        <video
          key={index}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          className="w-full h-full object-cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: index === currentVideoIndex ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}

      {/* Dots Indicator - Overlay on video */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              backgroundColor:
                index === currentVideoIndex
                  ? "#FF3D60"
                  : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

      {/* <span
        style={{
          position: "absolute",
          top: -60,
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          // zIndex: 1,
          margin: 16,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {props.config.thumbTitle}
      </span> */}
    </div>
  );
}
