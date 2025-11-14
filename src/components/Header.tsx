import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Small delay to ensure scroll completes before opening form
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openContactForm'));
      }, 500);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-[30px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[1008px]"
    >
      <div className={`bg-white flex items-center justify-between px-[18px] rounded-xl transition-all duration-300 `}>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Scroll to top"
        >
        <img
            src="/images/logo.png"
          className="aspect-[1.55] object-contain w-[93px]"
          alt="Kiora Logo"
        />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-11 text-[#797B8A]">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#solutions" className="hover:text-foreground transition-colors">Our Solutions</a>
          <a href="#about" className="hover:text-foreground transition-colors">About Us</a>
        </nav>
        
        {/* Desktop Contact Button */}
        <button 
          onClick={handleContactClick}
          className="hidden md:flex bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] items-center justify-center text-primary-foreground px-9 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Contact Us
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <nav className="flex flex-col text-[#797B8A]">
            <a 
              href="#how-it-works" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#solutions" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Solutions
            </a>
            <a 
              href="#about" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <button 
              onClick={handleContactClick}
              className="mx-4 my-4 bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.4)] text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
