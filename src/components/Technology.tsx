import React, { useEffect, useRef, useState } from 'react';

const Technology = () => {
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
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Technology with Purpose
      </h2>
      <p className={`text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Built by doctors. Backed by science.
      </p>
      
      <div className="w-full max-w-[1200px] mt-8 md:mt-[80px]">
        <div className="flex items-center justify-center overflow-hidden">
          <img
            src="/images/technology-with-purpose.png"
            alt="Kiora Technology"
            className={`w-full h-full object-contain transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          />
        </div>
      </div>
    </section>
  );
};

export default Technology;
