import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white self-stretch w-full overflow-hidden mt-[51px] pb-12 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
      <div className="border-t border-gray-200 w-full h-px mb-8" />
      <div className="flex w-full items-start justify-between gap-16 flex-wrap max-md:max-w-full max-md:gap-8">
        {/* Logo on left */}
        <div className="flex-shrink-0">
          <img
            src="/images/logo.png"
            className="aspect-[1.41] object-contain w-[165px] max-w-full"
            alt="Kiora Logo"
          />
        </div>
        
        {/* 3 columns on right */}
        <div className="flex gap-12 max-md:flex-col max-md:gap-8 max-md:w-full">
          {/* Index Column */}
          <nav className="flex flex-col text-base text-[#797B8A] font-medium gap-4">
            <div className="text-black font-semibold mb-2">Index</div>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it Works</a>
            <a href="#solutions" className="hover:text-gray-900 transition-colors">Our Solutions</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">About Us</a>
            <a href="#resources" className="hover:text-gray-900 transition-colors">Resources</a>
            <a href="#contact" className="hover:text-gray-900 transition-colors">Contact Us</a>
          </nav>
          
          {/* Contact Column */}
          <div className="flex flex-col text-base font-medium gap-4">
            <div className="text-black font-semibold mb-2">Contact</div>
            <a href="mailto:care@kiora.care" className="text-[#797B8A] hover:text-gray-900 transition-colors">
              care@kiora.care
            </a>
          </div>
          
          {/* Legal Column */}
          <div className="flex flex-col text-base font-medium gap-4">
            <div className="text-black font-semibold mb-2">Legal</div>
            <a href="#privacy" className="text-[#797B8A] hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-[#797B8A] hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      
      {/* Line break */}
      <div className="border-t border-gray-200 w-full h-px my-8" />
      
      {/* Copyright */}
      <div className="text-center text-sm text-[#797B8A]">
        Kendall Square Technology and Services Private Limited © 2025
      </div>
    </footer>
  );
};

export default Footer;
