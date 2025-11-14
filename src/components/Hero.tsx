import React from 'react';

const Hero = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Small delay to ensure scroll completes before opening form
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openContactForm'));
      }, 500);
    }
  };

  return (
    <section 
      className="relative flex flex-col items-center text-center px-4 pb-16 md:pb-32 overflow-hidden min-h-[100vh] justify-center w-full rounded-[25px]"
      style={{
        background: `
          radial-gradient(circle at 50% 30%, #E3E4E7 20%, transparent 60%),
          linear-gradient(to bottom, #E3E4E7,#E3E4E7,#E3E4E7, #E3E4E7, #C5DBEC, #B2D5ED, #96CCF9, #8FCAFD)
        `
      }}
    >
      <div className="relative z-10 mb-12">
        <h1 className="text-foreground font-normal mt-20 md:mt-[156px] max-w-[1200px] mx-auto">
        <span className="block text-[clamp(48px,8vw,128px)] leading-[1.1] tracking-tight">
          Life is Beautiful.
        </span>
        <span className="block text-[clamp(32px,5vw,64px)] leading-[1.2] tracking-tight mt-4">
          Even for those with kidney conditions.
        </span>
      </h1>
      
        <p className="text-foreground text-[clamp(16px,2vw,20px)] leading-[1.2] tracking-tight max-w-[1042px] mt-[18px] px-4">
        India's first comprehensive renal care solution.
        <br />
        Powered by AI and clinical expertise, preventing dialysis, restoring life.
      </p>
      
        <button 
          onClick={handleContactClick}
          className="bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] text-primary-foreground mt-12 px-9 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
        Contact Us
      </button>
      </div>
    </section>
  );
};

export default Hero;
