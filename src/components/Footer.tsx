import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleIndexLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const sectionId = hash.replace('#', '');
    
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Handle contact form opening
        if (hash === '#contact') {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openContactForm'));
          }, 500);
        }
      }
    } else {
      // If on another page, navigate to home with hash
      navigate('/', { replace: false });
      // Use a slightly longer timeout to ensure page has loaded
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL hash
          window.history.replaceState(null, '', hash);
          if (hash === '#contact') {
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('openContactForm'));
            }, 500);
          }
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-background self-stretch w-full overflow-hidden mt-10 md:mt-[51px] pb-8 md:pb-12 px-4 md:px-20">
      <div className="border-t border-border w-full h-px mb-6 md:mb-8" />
      <div className="flex w-full items-start justify-between gap-8 md:gap-16 flex-wrap">
        {/* Logo on left */}
        <div className="flex-shrink-0">
          <img
            src="/images/logo.png"
            className="aspect-[1.41] object-contain w-[165px] max-w-full transition dark:invert dark:brightness-150"
            alt="Kiora Logo"
          />
        </div>
        
        {/* 3 columns on right */}
        <div className="flex gap-6 md:gap-12 max-md:flex-col max-md:w-full">
          {/* Index Column */}
          <nav className="flex flex-col text-base text-muted-foreground font-medium gap-4">
            <div className="text-foreground font-semibold mb-2">Index</div>
            <a href="#how-it-works" onClick={(e) => handleIndexLinkClick(e, '#how-it-works')} className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#solutions" onClick={(e) => handleIndexLinkClick(e, '#solutions')} className="hover:text-foreground transition-colors">Our Solutions</a>
            <a href="#about" onClick={(e) => handleIndexLinkClick(e, '#about')} className="hover:text-foreground transition-colors">About Us</a>
            <a href="#resources" onClick={(e) => handleIndexLinkClick(e, '#resources')} className="hover:text-foreground transition-colors">Resources</a>
            <a href="#contact" onClick={(e) => handleIndexLinkClick(e, '#contact')} className="hover:text-foreground transition-colors">Contact Us</a>
            </nav>
          
          {/* Contact Column */}
          <div className="flex flex-col text-base font-medium gap-4">
            <div className="text-foreground font-semibold mb-2">Contact</div>
            <a href="mailto:care@kiora.care" className="text-muted-foreground hover:text-foreground transition-colors">
                  care@kiora.care
                </a>
              </div>
          
          {/* Legal Column */}
          <div className="flex flex-col text-base font-medium gap-4">
            <div className="text-foreground font-semibold mb-2">Legal</div>
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
      
      {/* Line break */}
      <div className="border-t border-border w-full h-px my-6 md:my-8" />
      
      {/* Copyright */}
      <div className="text-center text-xs md:text-sm text-muted-foreground px-4">
        Kendall Square Technology and Services Private Limited © 2025
      </div>
    </footer>
  );
};

export default Footer;
