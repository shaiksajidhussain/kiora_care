import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resourceArticles } from "@/data/resources";

const Resources = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const itemsPerPage = 3;
  const totalArticles = resourceArticles.length;
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
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
  const visibleResources = useMemo(() => {
    if (!totalArticles) {
      return [];
    }

    return resourceArticles.slice(0, Math.min(visibleCount, totalArticles));
  }, [visibleCount, totalArticles]);

  const handleExploreMore = () => {
    if (!totalArticles) {
      return;
    }
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, totalArticles));
  };

  const handleNavigate = (slug: string) => {
    navigate(`/resources/${slug}`);
  };

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-foreground text-[clamp(40px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] text-center mt-10 md:mt-[324px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Resources
      </h2>
      <p className={`text-foreground text-xl md:text-2xl font-normal tracking-[-0.48px] text-center max-w-full mt-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Expert-curated resources on kidney health, nutrition, and mental well-being.
      </p>
      
      <div className="w-full max-w-[1115px] mt-8 md:mt-[80px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleResources.map((resource, index) => (
            <article
              key={resource.slug}
              role="button"
              tabIndex={0}
              onClick={() => handleNavigate(resource.slug)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleNavigate(resource.slug);
                }
              }}
              className={`group h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[10px] transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0 animate-fade-slide" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-card shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex h-full flex-col rounded-[10px] border border-border p-4 transition-all duration-300 group-hover:scale-[1.015] group-hover:shadow-[0px_6px_30px_rgba(0,0,0,0.2)]">
                <div className="relative w-full rounded-lg overflow-hidden bg-muted/40">
                  <div className="aspect-[4/3] w-full flex items-center justify-center">
                    <img
                      src={resource.image}
                      className="h-full w-full object-contain"
                      alt={resource.title}
                      loading="lazy"
                    />
                  </div>
                </div>
                <h3 className="text-foreground text-xl font-semibold leading-6 tracking-tight mt-4">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 min-h-[48px] overflow-hidden">
                  {resource.excerpt}
                </p>
                {/* <time className="text-muted-foreground text-sm font-[510] leading-[1.4] tracking-[-0.45px] mt-auto">
                  {resource.date}
                </time> */}
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {visibleCount < totalArticles && (
        <button
          type="button"
          onClick={handleExploreMore}
          className={`bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] flex items-center justify-center text-primary-foreground px-9 py-2.5 rounded-xl transition-all duration-700 delay-500 mt-8 md:mt-[92px] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } hover:opacity-90 hover:scale-105 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.35)]`}
        >
          Explore More
        </button>
      )}
    </section>
  );
};

export default Resources;
