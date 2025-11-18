import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  details?: string;
  linkedinUrl?: string;
}

const AboutUs = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedMember(null);
      }
    };

    if (selectedMember) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMember]);

  const teamMembers: TeamMember[] = [
    {
      name: "Anupam Dey",
      role: "Co-founder",
      image: "/images/team-anupam-dey.png",
      linkedinUrl: "https://www.linkedin.com/in/anupam-d/"
    },
    {
      name: "Dr. K S Nayak",
      role: "Co-founder, Chief Medical Officer",
      image: "/images/team-dr-nayak.png",
      details: "Dr. K. S. Nayak is Director of the Department of Nephrology and Renal Transplant Services at Gleneagles Hospitals, Hyderabad Cluster, and a Visiting Scientist at the Renal Research Institute, New York. A globally recognized nephrologist and transplant specialist, he has made pioneering contributions to dialysis innovation, transplant medicine, and renal replacement therapy in India.\n\nA Fellow of the American Society of Nephrology (FASN, USA) and the Royal College of Physicians (FRCP, London), Dr. Nayak has served as Past President of the International Society of Blood Purification and is widely respected for his leadership in advancing high-quality, patient-centered kidney care.\n\nThrough his clinical excellence, research, and teaching, Dr. Nayak continues to bridge global best practices with local innovation, shaping the future of nephrology and renal transplantation in South Asia and beyond."
    },
    {
      name: "Dr. P V Lakshmi",
      role: "Clinical Nutritionist",
      image: "/images/team-dr-lakshmi.png",
      details: "Dr. P. V. Lakshmi previously served as Chief Dietician and Head of Nutrition and Dietetics at Gleneagles Hospital, Chennai, with over 24 years of expertise in clinical nutrition, critical care, and patient-centered dietary management. She has led nutrition services across major hospitals including Global, CARE, and Lazarus Hospitals, and has trained and mentored numerous dieticians and healthcare professionals.\n\nA Ph.D. in Food Science and Nutrition, Dr. Lakshmi blends clinical excellence with academic research and holistic wellness. Her advanced training spans ESPEN-certified modules in renal, critical care, and metabolic nutrition, along with postgraduate degrees in Hospital Management, Yoga & Naturopathy, and Sociology.\n\nA recipient of the Young Investigator Award from the Tamil Nadu Kidney Research Foundation, she has published extensively in renal and metabolic nutrition and remains an active voice in professional bodies such as the Indian Dietetic Association (IDA) and ISPEN, promoting evidence-based and integrated nutrition care."
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
    <section 
      ref={sectionRef}
      id="about" 
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-black text-[clamp(42px,5.5vw,68px)] font-medium leading-none tracking-tight text-center mt-10 md:mt-[200px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        About Us
      </h2>
      <p className={`text-black text-xl md:text-2xl font-normal tracking-[-0.48px] text-center max-w-full mt-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Deep commitment to improving healthcare outcomes
      </p>
      
      <div className="w-full max-w-[1146px] mt-8 md:mt-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {teamMembers.map((member, index) => {
            return (
              <article 
                key={index} 
                className={`h-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${200 + index * 50}ms` }}
              >
                <div 
                  onClick={() => member.details && setSelectedMember(member)}
                  className={`bg-white shadow-[0px_1px_60px_rgba(0,0,0,0.25)] border flex flex-col overflow-hidden w-full pt-3 pb-6 px-[clamp(10px,1.5vw,13px)] rounded-[33px] border-[rgba(228,228,228,1)] border-solid h-full transition-transform duration-300 hover:scale-105 ${member.details ? 'cursor-pointer' : ''}`}
                >
                  <div className="self-stretch overflow-hidden pt-2.5 rounded-[33px]">
                    <img
                      src={member.image}
                      className="aspect-[0.91] object-contain w-full"
                      alt={member.name}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-3 pr-2">
                    <div className="flex-1">
                      <h3 className="text-black text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.48px]">
                        {member.name}
                      </h3>
                      <p className="text-black text-[clamp(14px,1.5vw,20px)] font-normal tracking-[-0.4px]">
                        {member.role}
                      </p>
                    </div>
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 text-[#0077b5] hover:text-[#005885] transition-colors mr-1"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="w-8 h-8 md:w-8 md:h-8" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedMember && selectedMember.details && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div 
            ref={modalRef}
            className="bg-[#F5F5F5] rounded-[20px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)] border border-[rgba(228,228,228,0.8)] relative w-full max-w-[1200px] max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: '0px 4px 20px rgba(0,0,0,0.25), inset 0px 0px 0px 1px rgba(228,228,228,0.8)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Image */}
              <div className="flex justify-center mb-6">
                <div 
                  className="rounded-[12px] overflow-hidden"
                  style={{
                    backgroundColor: '#B2D5ED',
                    padding: '8px',
                    borderRadius: '12px'
                  }}
                >
                  <img
                    src={selectedMember.image}
                    className="w-[200px] h-[240px] object-cover rounded-[8px]"
                    alt={selectedMember.name}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-black text-[clamp(22px,3vw,36px)] font-bold text-center mb-6">
                {selectedMember.name}
              </h3>

              {/* Details */}
              <div className="text-black text-[clamp(15px,1.8vw,20px)] leading-relaxed whitespace-pre-line">
                {selectedMember.details.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUs;
