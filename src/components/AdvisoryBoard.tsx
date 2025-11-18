import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Advisor {
  name: string;
  role: string;
  image: string;
  details?: string;
}

const AdvisoryBoard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
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
        setSelectedAdvisor(null);
      }
    };

    if (selectedAdvisor) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [selectedAdvisor]);

  const advisors: Advisor[] = [
    {
      name: "Dr. Sandeep Mahajan",
      role: "Professor, Dept of Nephrology, AIIMS, Delhi",
      image: "/images/advisor-sandeep-mahajan.png",
      details: "Professor Sandeep Mahajan is a leading nephrologist and academic based at the All India Institute of Medical Sciences (AIIMS), New Delhi, where he has been a full-time faculty member since 2002. Over the past two decades, he has trained numerous nephrology fellows and contributed extensively to advancing renal medicine in India.\n\nHis work spans clinical research, policy, and advocacy with more than 100 peer-reviewed publications, key roles in global studies like the ISCHEMIA-CKD trial, and contributions to multiple national kidney-care guidelines. Professor Mahajan also serves on expert panels of the Government of India, NITI Aayog, and the World Health Organization, helping shape the future of kidney-health programs.\n\nAs a mentor and advisor, he continues to drive evidence-based, patient-centered innovations in nephrology, building bridges between academia, technology, and public health."
    },
    {
      name: "Dr. Mayoor Prabhu",
      role: "Head, Dept of Nephrology, Manipal Hospital, Mangalore",
      image: "/images/advisor-mayoor-prabhu.png",
      details: "Dr. Mayoor V. Prabhu is Professor and Head of Nephrology at Kasturba Medical College, Mangalore (Manipal University), and Consultant Nephrologist and Transplant Physician at KMC Hospital. With over two decades of clinical and academic experience, he has been a leading advocate for peritoneal dialysis and kidney-care innovations in India, including the country's first public-private partnership dialysis program.\n\nA Fellow of the American Society of Nephrology, Dr. Prabhu has received multiple international awards for his work in dialysis access, transplant immunology, and kidney-disease management in resource-limited settings. He serves on the editorial boards of Frontiers in Nephrology and The Open Access Urology and Nephrology Journal, and contributes actively to global and Asian nephrology committees.\n\nThrough his leadership, research, and advocacy, Dr. Prabhu continues to advance equitable and evidence-based kidney care across South and Southeast Asia."
    },
    {
      name: "Dr. Shruti Tapiawala",
      role: "Senior Nephrologist, Gleneagles Hospital, Mumbai",
      image: "/images/advisor-shruti-tapiawala.png",
      details: "Dr. Shruti Tapiawala is a Senior Consultant Nephrologist and Multi-Organ Transplant Physician at Gleneagles Hospitals and Nanavati Max Super Speciality Hospital, Mumbai. With over two decades of experience in nephrology, renal nutrition, and transplant immunology, she is among India's foremost experts in kidney and solid-organ transplantation.\n\nA Fellow of the American Society of Transplantation, Dr. Tapiawala trained in Clinical Nephrology and HLA Medicine at the University Health Network, Canada. She directs Advanced Transplant Diagnostics and Immunogenetics Pvt. Ltd., Mumbai's leading center for transplant immunology and HLA testing, and established India's first Sensitized Organ Recipient Transplant Exchange Registry (SORTER).\n\nWith over 40 peer-reviewed publications and leadership roles in national nephrology bodies, she continues to drive precision medicine and patient-centered innovations in transplantation."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="flex flex-col items-center px-4 py-10 md:py-20"
    >
      <h2 className={`text-black text-[clamp(40px,8vw,64px)] font-[510] leading-none tracking-[-1.28px] text-center mt-10 md:mt-[191px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Advisory Board & Mentors
      </h2>
      <p className={`text-black text-xl md:text-2xl font-normal leading-[3] tracking-[-0.48px] text-center mt-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        Guided by India's leading clinicians
      </p>
      
      <div className="w-full max-w-[1147px] mt-8 md:mt-[80px]">
        <div className="gap-4 md:gap-5 flex max-md:flex-col max-md:items-stretch">
          {advisors.map((advisor, index) => (
            <article 
              key={index} 
              className={`w-[33%] max-md:w-full max-md:ml-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div 
                onClick={() => advisor.details && setSelectedAdvisor(advisor)}
                className={`bg-white shadow-[0px_1px_60px_rgba(0,0,0,0.25)] border flex grow flex-col overflow-hidden w-full pt-3 pb-[27px] px-[13px] rounded-[33px] border-[rgba(228,228,228,1)] border-solid max-md:mt-6 transition-all duration-300 hover:scale-105 hover:shadow-[0px_2px_80px_rgba(0,0,0,0.35)] ${advisor.details ? 'cursor-pointer' : ''}`}
              >
                <div className="self-stretch overflow-hidden rounded-[33px]">
                  <img
                    src={advisor.image}
                    className="aspect-[0.88] object-contain w-full"
                    alt={advisor.name}
                  />
                </div>
                <h3 className="text-black text-2xl font-bold  tracking-[-0.48px] mt-[19px] max-md:ml-2 mx-2 md:mx-3">
                  {advisor.name}
                </h3>
                <p className="text-black text-xl font-normal leading-6 tracking-[-0.4px] mt-1 max-md:ml-2 mx-2 md:mx-3">
                  {advisor.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedAdvisor && selectedAdvisor.details && (
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
              onClick={() => setSelectedAdvisor(null)}
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
                    src={selectedAdvisor.image}
                    className="w-[200px] h-[240px] object-cover rounded-[8px]"
                    alt={selectedAdvisor.name}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-black text-[clamp(22px,3vw,36px)] font-bold text-center mb-6">
                {selectedAdvisor.name}
              </h3>

              {/* Details */}
              <div className="text-black text-[clamp(15px,1.8vw,20px)] leading-relaxed whitespace-pre-line">
                {selectedAdvisor.details.split('\n\n').map((paragraph, idx) => (
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

export default AdvisoryBoard;
