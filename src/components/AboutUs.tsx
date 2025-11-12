import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Anupam Dey",
      role: "Co-founder",
      image: "/images/team-anupam-dey.png"
    },
    {
      name: "Dr. K S Nayak",
      role: "Co-founder, Chief Medical Officer",
      image: "/images/team-dr-nayak.png"
    },
    {
      name: "Dr. P V Lakshmi",
      role: "Clinical Nutritionist",
      image: "/images/team-dr-lakshmi.png"
    },
    {
      name: "Shruti Mahesh",
      role: "Product Designer",
      image: "/images/team-shruti-mahesh.png"
    },
    {
      name: "Jignesh Motwani",
      role: "Backend & Cloud Infra Engineer",
      image: "/images/team-jignesh-motwani.png"
    },
    {
      name: "Syarifah Fitria Hannan",
      role: "Designer",
      image: "/images/team-syarifah-fitria.png"
    }
  ];

  return (
    <section id="about" className="flex flex-col items-center px-4 py-10 md:py-20">
      <h2 className="text-black text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center mt-10 md:mt-[200px]">
        About Us
      </h2>
      <p className="text-black text-xl md:text-2xl font-normal leading-[3] tracking-[-0.48px] text-center max-w-full mt-4">
        Deep commitment to improving healthcare outcomes
      </p>
      
      <div className="w-full max-w-[1146px] mt-8 md:mt-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {teamMembers.map((member, index) => (
            <article key={index} className="h-full">
              <div className="bg-white shadow-[0px_1px_60px_rgba(0,0,0,0.25)] border flex flex-col overflow-hidden w-full pt-3 pb-6 px-[clamp(10px,1.5vw,13px)] rounded-[33px] border-[rgba(228,228,228,1)] border-solid h-full transition-transform duration-300 hover:scale-105">
                <div className="bg-[rgba(183,214,236,1)] self-stretch overflow-hidden pt-2.5 rounded-[33px]">
                  <img
                    src={member.image}
                    className="aspect-[0.91] object-contain w-full"
                    alt={member.name}
                  />
                </div>
                <h3 className="text-black text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.48px] mt-3">
                  {member.name}
                </h3>
                <p className="text-black text-[clamp(14px,1.5vw,20px)] font-normal tracking-[-0.4px]">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
