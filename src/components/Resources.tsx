import React from 'react';

const Resources = () => {
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
    <section className="flex flex-col items-center px-4 py-10 md:py-20">
      <h2 className="text-black text-[clamp(40px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] text-center mt-10 md:mt-[324px]">
        Resources
      </h2>
      <p className="text-black text-xl md:text-2xl font-normal tracking-[-0.48px] text-center max-w-full mt-4">
        Expert-curated resources on kidney health, nutrition, and mental well-being.
      </p>
      
      <div className="w-full max-w-[1115px] mt-8 md:mt-[80px]">
        <div className="gap-4 md:gap-5 flex max-md:flex-col max-md:items-stretch">
          {resources.map((resource, index) => (
            <article key={index} className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.25)] flex flex-col items-center aspect-[1] w-full rounded-[10px] max-md:mt-6 transition-transform duration-300 hover:scale-105">
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
      
      <button className="bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] flex items-center justify-center text-primary-foreground px-9 py-2.5 rounded-xl hover:opacity-90 transition-opacity mt-8 md:mt-[92px]">
        Explore More
      </button>
    </section>
  );
};

export default Resources;
