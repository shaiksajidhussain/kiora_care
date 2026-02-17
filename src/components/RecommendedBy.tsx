import React, { useEffect, useRef, useState } from 'react';

const RecommendedBy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-8 md:py-16"
    >
      <p className={`text-foreground text-[clamp(16px,2.5vw,20px)] font-normal leading-normal tracking-tight text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Recommended by experts from
      </p>
      
      <div className="flex items-center justify-center gap-8">
        <img
          src="/images/hospitals.png"
          className={`h-[clamp(120px,12vw,200px)] object-contain transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          alt="Recommended hospitals"
        />
      </div>
    </section>
  );
};

export default RecommendedBy;

