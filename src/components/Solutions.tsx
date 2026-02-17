import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Solutions = () => {
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
  const handleLearnMore = (solutionType: 'managed' | 'dialysis') => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Small delay to ensure scroll completes before opening form
      setTimeout(() => {
        const message = solutionType === 'managed' 
          ? 'I am interested in learning more about Managed Care.'
          : 'I am interested in learning more about Dialysis Care.';
        window.dispatchEvent(new CustomEvent('openContactForm', { detail: { message } }));
      }, 500);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="solutions" 
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Our Solutions
      </h2>
      <p className={`text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 max-w-[900px] transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Built with patented technology and clinical expertise to serve every stage of kidney care
      </p>
      <div className="w-full max-w-[1387px] mt-8 md:mt-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Managed Care Card */}
          <article 
            className={`rounded-3xl shadow-[0px_1px_250px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-700 delay-200 hover:scale-[1.02] hover:shadow-[0px_1px_300px_rgba(0,0,0,0.35)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{
              background: 'linear-gradient(to bottom, #373737 0%, #171717 100%)'
            }}
          >
            <div className="p-4 md:p-6">
              <img
                src="/images/preventive-care.png"
                alt="Managed Care"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            
            <div className="px-6 md:px-10 py-6 md:py-8">
              <h3 className="text-white text-[clamp(28px,3vw,36px)] font-normal leading-tight tracking-tight">
                Managed Care
              </h3>
              <p className="text-[#828282] text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4">
                Your trusted partner in slowing kidney disease progression. Our proactive health monitoring, clinical guidance, and timely interventions help you stay ahead of risks.
              </p>
              <button 
                onClick={() => handleLearnMore('managed')}
                className="mt-6 text-white text-[clamp(18px,2vw,24px)] font-medium tracking-tight px-6 py-3 rounded-xl flex items-center gap-3 border-[1.5px] border-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(to bottom, #424242, #303030)',
                  borderWidth: '1px',
                  borderColor: '#fff'
                }}
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </article>
          
          {/* Dialysis Care Card */}
          <article 
            className={`rounded-3xl shadow-[0px_1px_250px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-700 delay-300 hover:scale-[1.02] hover:shadow-[0px_1px_300px_rgba(0,0,0,0.35)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{
              background: 'linear-gradient(to bottom, #373737 0%, #171717 100%)'
            }}
          >
            <div className="px-6 md:px-10 py-6 md:py-8">
              <h3 className="text-white text-[clamp(28px,3vw,36px)] font-normal leading-tight tracking-tight">
                Dialysis Care
              </h3>
              <p className="text-[#828282] text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4">
                Improving quality of life through real-time AI monitoring, remote support, and optimized treatment protocols.
              </p>
              <button 
                onClick={() => handleLearnMore('dialysis')}
                className="mt-6 text-white text-[clamp(18px,2vw,24px)] font-medium tracking-tight px-6 py-3 rounded-xl flex items-center gap-3 border-white border-[1px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(to bottom, #424242, #303030)'
                }}
              >
                <span>Learn More</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 md:p-6">
              <img
                src="/images/dialysis-care.png"
                alt="Dialysis Care"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
