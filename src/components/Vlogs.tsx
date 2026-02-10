import React, { useEffect, useMemo, useRef, useState } from "react";
import { vlogVideos, type VlogVideo } from "@/data/vlogs";
import { X } from "lucide-react";

const Vlogs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<VlogVideo | null>(null);
  const totalVideos = vlogVideos.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const visibleVideos = useMemo(() => vlogVideos.slice(0, Math.min(visibleCount, totalVideos)), [visibleCount, totalVideos]);

  const handleExploreMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, totalVideos));
  };

  useEffect(() => {
    if (selectedVideo) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo]);

  return (
    <>
      <section ref={sectionRef} className="flex flex-col items-center px-4 pb-16 pt-6">
      <div className="text-center">
        <h2 className={`mt-4 text-foreground text-[clamp(40px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Vlogs
        </h2>
        <p className={`text-foreground text-xl md:text-2xl font-normal tracking-[-0.48px] max-w-3xl mt-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Real stories, expert insights, and easy-to-follow kidney care guidance, explained through videos.
        </p>
      </div>

      <div className="w-full max-w-[1115px] mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleVideos.map((video, index) => (
            <article
              key={`${video.title}-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedVideo(video)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedVideo(video);
                }
              }}
              className={`group h-full cursor-pointer rounded-[10px] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              <div className="bg-card shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex h-full flex-col rounded-[10px] border border-border p-4 transition-all duration-300 group-hover:scale-[1.015] group-hover:shadow-[0px_6px_30px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <div className="relative w-full overflow-hidden rounded-lg bg-muted/40">
                  <div className="aspect-[4/3] w-full flex items-center justify-center">
                    <img src={video.image} alt={video.title} loading="lazy" className="h-full w-full object-contain" />
                  </div>
                </div>
                <h3 className="text-foreground text-xl font-semibold leading-6 tracking-tight mt-4">{video.title}</h3>
                <time className="text-muted-foreground text-sm font-[510] leading-[1.4] tracking-[-0.45px] mt-2">{video.date}</time>
              </div>
            </article>
          ))}
        </div>
      </div>

      {visibleCount < totalVideos && (
        <button
          type="button"
          onClick={handleExploreMore}
          className={`bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] flex items-center justify-center text-primary-foreground px-9 py-2.5 rounded-xl transition-all duration-700 delay-500 mt-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } hover:opacity-90 hover:scale-105 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.35)]`}
        >
          Explore More
        </button>
      )}
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideo.title} video`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedVideo(null);
            }
          }}
        >
          <div className="relative w-full max-w-4xl rounded-3xl bg-card p-6 shadow-2xl">
            <button
              type="button"
              aria-label="Close video"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <video
                src={selectedVideo.video}
                poster={selectedVideo.image}
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-foreground">{selectedVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Vlogs;

