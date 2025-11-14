import React, { useEffect, useRef, useState } from 'react';

const Resources = () => {
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
  const resources = [
    {
      title: "Managing Common Problems During Dialysis",
      date: "12 Nov 2025",
      image: "/images/resource-dialysis.png"
    },
    {
      title: "Monsoon & Your Kidneys: Staying Safe During Flu Season",
      date: "23 Oct 2025",
      image: "/images/resource-monsoon.png"
    },
    {
      title: "Managing Stress for Better Renal Health",
      date: "13 Sep 2025",
      image: "/images/resource-mind-kidney.png"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-black text-[clamp(40px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] text-center mt-10 md:mt-[324px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Resources
      </h2>
      <p className={`text-black text-xl md:text-2xl font-normal tracking-[-0.48px] text-center max-w-full mt-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Expert-curated resources on kidney health, nutrition, and mental well-being.
      </p>
      
      <div className="w-full max-w-[1115px] mt-8 md:mt-[80px]">
        <div className="gap-4 md:gap-5 flex max-md:flex-col max-md:items-stretch">
          {resources.map((resource, index) => (
            <article 
              key={index} 
              className={`w-[33%] max-md:w-full max-md:ml-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex flex-col items-center aspect-[1] w-full rounded-[10px] max-md:mt-6 transition-all duration-300 hover:scale-105 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.35)]">
                <div className="border flex flex-col items-stretch px-5 py-[22px] rounded-[10px] border-[rgba(34,34,34,0.1)] border-solid">
                  <img
                    src={resource.image}
                    className="aspect-[1.39] object-contain w-full rounded-lg"
                    alt={resource.title}
                  />
                  <h3 className="text-black text-xl font-[590] leading-6 tracking-[-0.4px] mr-6 mt-4 max-md:mr-2.5">
                    {resource.title}
                  </h3>
                  <time className="text-[#171717] text-sm font-[510] leading-[1.4] tracking-[-0.45px] mt-[13px]">
                    {resource.date}
                  </time>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      <button className={`bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] flex items-center justify-center text-primary-foreground px-9 py-2.5 rounded-xl hover:opacity-90 transition-all duration-700 delay-500 hover:scale-105 hover:shadow-[0px_6px_30px_rgba(0,0,0,0.35)] mt-8 md:mt-[92px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Explore More
      </button>
    </section>
  );
};

export default Resources;
