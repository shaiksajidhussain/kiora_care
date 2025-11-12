import React from 'react';

const Technology = () => {
  return (
    <section className="flex flex-col items-center px-4 py-10 md:py-20">
      <h2 className="text-foreground text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center">
        Technology with Purpose
      </h2>
      <p className="text-foreground text-[clamp(18px,2vw,24px)] font-normal leading-relaxed tracking-tight text-center mt-4">
        Built by doctors. Backed by science.
      </p>
      
      <div className="w-full max-w-[1200px] mt-8 md:mt-[80px]">
        <div className=" flex items-center justify-center  overflow-hidden">
          <img
            src="/images/technology-with-purpose.png"
            alt="Kiora Technology"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Technology;
