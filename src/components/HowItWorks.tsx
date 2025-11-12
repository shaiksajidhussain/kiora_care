import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="flex flex-col items-center px-4 py-20">
      <h2 className="text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center">
        How it Works
      </h2>
      <p className="text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4 max-w-[800px]">
        Personalized, coordinated, evidence-based support
      </p>
      
      <div className="w-full max-w-[1175px] mt-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <article className="bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-[570px]">
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Holistic Support
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Nutrition, mental well-being, and lifestyle guidance from certified specialists.
            </p>
            <img
              src="/images/holistic-support.png"
              alt="Holistic Support"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
          
          {/* Card 2 */}
          <article className="bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-[496px]">
            <h3 className="text-foreground text-[clamp(24px,3vw,32px)] font-semibold leading-tight tracking-tight text-center mt-6">
              Ongoing Monitoring & Protocols
            </h3>
            <p className="text-muted-foreground text-[clamp(16px,2vw,20px)] font-normal leading-relaxed tracking-tight mt-4 text-center">
              Automated scheduling of lab tests, vitals monitoring, and medication with expert supervision.
            </p>
            <img
              src="/images/monitoring-protocols.png"
              alt="Ongoing Monitoring & Protocols"
              className="w-full h-auto rounded-b-[22px] mt-auto mb-6 object-contain"
            />
          </article>
          
          {/* Card 3 */}
          <article className="bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-[489px]">
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
          
          {/* Card 4 */}
          <article className="bg-white shadow-[0px_1px_30px_rgba(0,0,0,0.25)] border border-border rounded-[22px] px-6 pt-6 pb-0 flex flex-col h-[563px] -mt-[74px]">
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
        </div>
      </div>
      <br/><br/><br/>
    </section>
  );
};

export default HowItWorks;
