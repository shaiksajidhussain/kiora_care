import React, { useEffect, useRef, useState } from 'react';

const HowItWorks = () => {
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
      id="how-it-works" 
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        How it Works
      </h2>
      <p className={`text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 max-w-[800px] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Personalized, coordinated, evidence-based treatment
      </p>
      
      <div className="w-full max-w-[1175px] mt-8 md:mt-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 - Personalized Care Plan */}
          <article className={`bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-auto md:h-[575px] transition-all duration-700 delay-200 hover:scale-[1.02] hover:shadow-[0px_1px_40px_rgba(0,0,0,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Personalized Care Plan
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Tailored plans recommended by experts for your kidney health.
            </p>
            <img
              src="/images/personalized-care-plan.png"
              alt="Personalized Care Plan"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
          
          {/* Card 2 - Continuous Monitoring & Protocols */}
          <article className={`bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-auto md:h-[490px] transition-all duration-700 delay-300 hover:scale-[1.02] hover:shadow-[0px_1px_40px_rgba(0,0,0,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Continuous Monitoring & Protocols
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Automated scheduling of lab tests, vitals monitoring, and medication with expert supervision.
            </p>
            <img
              src="/images/monitoring-protocols.png"
              alt="Continuous Monitoring & Protocols"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
          
          {/* Card 3 - Holistic Care */}
          <article className={`bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-auto md:h-[490px] transition-all duration-700 delay-400 hover:scale-[1.02] hover:shadow-[0px_1px_40px_rgba(0,0,0,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Holistic Care
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Nutrition, mental well-being, and lifestyle guidance from certified specialists.
            </p>
            <img
              src="/images/holistic-support.png"
              alt="Holistic Care"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
          
          {/* Card 4 - Built for India */}
          <article className={`bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-auto md:h-[575px] md:-mt-[85px] transition-all duration-700 delay-500 hover:scale-[1.02] hover:shadow-[0px_1px_40px_rgba(0,0,0,0.3)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Built for India
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Simple, WhatsApp-based, and privacy-first. All data is encrypted and securely managed in compliance with healthcare standards.
            </p>
            <img
              src="/images/built-for-india.png"
              alt="Built for India"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
