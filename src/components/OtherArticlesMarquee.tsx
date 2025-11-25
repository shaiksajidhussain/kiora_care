import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { resourceArticles } from "@/data/resources";

type OtherArticlesMarqueeProps = {
  currentSlug: string;
};

// Helper: duplicated array for seamless looping
function getLoopedArticles(articles: any[], minCount: number = 10) {
  // Duplicate until long enough to fill a wide display
  let repeated: any[] = [];
  while (repeated.length < minCount) {
    repeated = [...repeated, ...articles];
  }
  return repeated;
}

const OtherArticlesMarquee = ({ currentSlug }: OtherArticlesMarqueeProps) => {
  const navigate = useNavigate();

  // Exclude the current article
  const otherArticles = resourceArticles.filter((article) => article.slug !== currentSlug);
  if (otherArticles.length === 0) {
    return null;
  }

  // Logic for seamless infinite marquee: repeat articles more than needed, loop scroll
  const marqueeItems = getLoopedArticles(otherArticles, 16); // adjust 16 for enough width

  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const speed = 16; // px per second (reduced from 40)

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let start = performance.now();
    let left = 0;

    // Get total scroll width to know when to loop
    const totalWidth = track.scrollWidth / 2; // Because we loop list twice below

    const step = (now: number) => {
      const dt = (now - start) / 1000;
      start = now;
      left -= speed * dt;

      if (Math.abs(left) >= totalWidth) {
        left = 0;
      }

      track.style.transform = `translateX(${left}px)`;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [otherArticles.length]);

  return (
    <section className="w-full py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">View other articles</p>
          <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">Explore more kidney health insights</h2>
        </header>
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(34,34,34,0.08)] bg-white py-6">
          {/* 
            We render two sets of the same items to ensure seamless looping.
            The JS animation loop translates the track and resets after half the width is scrolled.
           */}
          <div
            className="flex min-w-full gap-6 pl-6 will-change-transform"
            ref={trackRef}
            style={{ transition: 'none' }}
            aria-label="Other articles carousel"
          >
            {[...marqueeItems, ...marqueeItems].map((article, index) => (
              <article
                key={`${article.slug}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/resources/${article.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/resources/${article.slug}`);
                  }
                }}
                className="w-[280px] shrink-0 rounded-xl border border-[rgba(34,34,34,0.08)] bg-[#f8fbff] text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative w-full overflow-hidden rounded-t-xl bg-white">
                  <div className="aspect-[4/3] w-full flex items-center justify-center">
                    <img src={article.image} alt={article.title} className="h-full w-full object-contain p-4" loading="lazy" />
                  </div>
                </div>
                <div className="px-5 pb-4 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Resource</p>
                  <h3 className="mt-2 text-base font-semibold text-[#101828]">{article.title}</h3>
                  <p className="mt-2 min-h-[66px] overflow-hidden text-sm text-[#475467]">{article.excerpt}</p>
                  <time className="mt-4 block text-xs font-medium text-[#475467]">{article.date}</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherArticlesMarquee;
