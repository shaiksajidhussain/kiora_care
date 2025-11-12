import React from 'react';

const AdvisoryBoard = () => {
  const advisors = [
    {
      name: "Dr. Sandeep Mahajan",
      role: "Professor, Dept of Nephrology, AIIMS, Delhi",
      image: "/images/advisor-sandeep-mahajan.png"
    },
    {
      name: "Dr. Mayoor Prabhu",
      role: "Head, Nephrology, Manipal Hospitals, Mangalore",
      image: "/images/advisor-mayoor-prabhu.png"
    },
    {
      name: "Dr. Shruti Tapiawala",
      role: "Dept of Nephrology, Gleneagles Hospitals, Mumbai",
      image: "/images/advisor-shruti-tapiawala.png"
    }
  ];

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-black text-[64px] font-[510] leading-none tracking-[-1.28px] text-center mt-[191px] max-md:max-w-full max-md:text-[40px] max-md:mt-10">
        Advisory Board & Mentors
      </h2>
      <p className="text-black text-2xl font-normal leading-[3] tracking-[-0.48px] text-center">
        Guided by India's leading clinicians
      </p>
      
      <div className="w-[1147px] max-w-full mt-[80px] max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {advisors.map((advisor, index) => (
            <article key={index} className="w-[33%] max-md:w-full max-md:ml-0">
              <div className="bg-white shadow-[0px_1px_60px_rgba(0,0,0,0.25)] border flex grow flex-col overflow-hidden w-full pt-3 pb-[27px] px-[13px] rounded-[33px] border-[rgba(228,228,228,1)] border-solid max-md:mt-10 transition-transform duration-300 hover:scale-105">
                <div className="bg-[rgba(183,214,236,1)] self-stretch overflow-hidden rounded-[33px]">
                  <img
                    src={advisor.image}
                    className="aspect-[0.88] object-contain w-full"
                    alt={advisor.name}
                  />
                </div>
                <h3 className="text-black text-2xl font-bold  tracking-[-0.48px] mt-[19px] max-md:ml-2">
                  {advisor.name}
                </h3>
                <p className="text-black text-xl font-normal leading-6 tracking-[-0.4px] mt-1 max-md:ml-2">
                  {advisor.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisoryBoard;
