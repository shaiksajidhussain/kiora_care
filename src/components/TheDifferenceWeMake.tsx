import React, { useEffect, useRef, useState } from 'react';

const TheDifferenceWeMake = () => {
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

  const stats = [
    {
      number: 1,
      value: "15 Cr+",
      description: "Chronic kidney disease patients in India, affecting their lifestyle and long-term health."
    },
    {
      number: 2,
      value: "30x",
      description: "Savings in annual treatment cost for Kiora patients, helping them avoid over ₹4 lacs a year in dialysis costs."
    },
    {
      number: 3,
      value: "40%",
      description: "Slowdown in disease progression through multidisciplinary coordinated care, improving overall health outcomes."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        The Difference We Make
      </h2>
      <p className={`text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 max-w-[900px] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        The Problem. The Impact. The Change.
      </p>
      
      <div className="w-full max-w-[1200px] mt-8 md:mt-[80px]">
        {/* Desktop: Horizontal layout with connecting lines */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* First connecting line (between circle 1 and 2) */}
          <div 
            className="absolute top-[25px] z-0"
            style={{
              left: 'calc(16.666% + 25px + 50px)',
              width: 'calc(33.333% - 50px - 100px)',
              height: '1px',
              background: 'linear-gradient(to right, #FFFFFF 0%, #000000 50%, #FFFFFF 100%)',
              borderRadius: '1px'
            }}
          />
          
          {/* Second connecting line (between circle 2 and 3) */}
          <div 
            className="absolute top-[25px] z-0"
            style={{
              left: 'calc(50% + 25px + 50px)',
              width: 'calc(33.333% - 50px - 100px)',
              height: '1px',
              background: 'linear-gradient(to right, #FFFFFF 0%, #000000 50%, #FFFFFF 100%)',
              borderRadius: '1px'
            }}
          />
          
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center flex-1 relative z-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Number circle */}
              <div 
                className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110"
                style={{
                  backgroundColor: '#1190FF',
                  boxShadow: 'inset 0px 0px 10px rgba(255,255,255,1), 0px 4px 10px rgba(255,255,255,1)'
                }}
              >
                <span className="text-white text-2xl font-bold text-center leading-none flex items-center justify-center">{stat.number}</span>
              </div>
              
              {/* Statistic */}
              <h3 className="text-black text-[clamp(36px,4vw,56px)] font-bold leading-tight tracking-tight text-center mb-4">
                {stat.value}
              </h3>
              
              {/* Description */}
              <p className="text-black text-[clamp(16px,1.8vw,20px)] font-normal leading-relaxed tracking-tight text-center max-w-[340px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical layout with separator lines */}
        <div className="flex md:hidden flex-col relative">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center py-6 pb-8 relative">
                {/* Number circle */}
                <div 
                  className="w-[50px] h-[50px] rounded-[50px] flex items-center justify-center mb-6 relative z-10"
                  style={{
                    backgroundColor: '#1190FF',
                    boxShadow: 'inset 0px 0px 10px rgba(255,255,255,1), 0px 4px 10px rgba(255,255,255,1)'
                  }}
                >
                  <span className="text-white text-2xl font-bold text-center leading-none flex items-center justify-center">{stat.number}</span>
                </div>
                
                {/* Statistic */}
                <h3 className="text-black text-[clamp(36px,8vw,48px)] font-bold leading-tight tracking-tight text-center mb-4">
                  {stat.value}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-[clamp(16px,4vw,18px)] font-normal leading-relaxed tracking-tight text-center px-4">
                  {stat.description}
                </p>
              </div>
              
              {/* Gradient separator line (not after last item) */}
              {index < stats.length - 1 && (
                <div 
                  className="h-[1px] mx-auto relative z-0 my-4"
                  style={{
                    width: 'calc(100% - 100px)',
                    background: 'linear-gradient(to right, #FFFFFF 0%, #000000 50%, #FFFFFF 100%)',
                    borderRadius: '1px'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheDifferenceWeMake;

