import React from 'react';

const RecommendedBy = () => {
  return (
    <section className="flex flex-col items-center px-4 py-8 md:py-16">
      <p className="text-foreground text-[clamp(16px,2.5vw,20px)] font-normal leading-normal tracking-tight text-center">
        Recommended by experts from
      </p>
      
      <div className="flex items-center justify-center gap-8">
        <img
          src="/images/hospitals.png"
          className="h-[clamp(12 0px,12vw,200px)] object-contain opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
    </section>
  );
};

export default RecommendedBy;

