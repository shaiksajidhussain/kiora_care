import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const sectionId = hash.replace('#', '');
    
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If on another page, navigate to home first
      navigate('/', { replace: false });
      // After navigation, scroll to section
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL hash
          window.history.replaceState(null, '', hash);
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    window.location.href = 'https://app.kiora.care';
    setIsMobileMenuOpen(false);
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If on home page, scroll to section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('openContactForm'));
        }, 500);
      } else {
        // If section not found, scroll to bottom and open form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('openContactForm'));
        }, 500);
      }
    } else {
      // If on another page, navigate to home first
      navigate('/');
      // Wait for navigation and page load, then scroll to contact
      // Use a more reliable approach with multiple retries
      let retries = 0;
      const maxRetries = 20; // 2 seconds max wait
      const scrollToContact = () => {
        const section = document.getElementById('contact');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openContactForm'));
          }, 500);
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(scrollToContact, 100);
        } else {
          // Fallback: scroll to bottom and open form
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openContactForm'));
          }, 500);
        }
      };
      setTimeout(scrollToContact, 200);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-[30px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[1008px]"
    >
      <div className="bg-background border border-border flex items-center justify-between px-[18px] rounded-xl shadow-sm transition-all duration-300">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <img
            src="/images/logo.png"
            className="aspect-[1.55] object-contain w-[93px] transition dark:invert dark:brightness-150"
            alt="Kiora Logo"
          />
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-11 text-muted-foreground">
          <a href="#how-it-works" onClick={(e) => handleNavLinkClick(e, '#how-it-works')} className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#solutions" onClick={(e) => handleNavLinkClick(e, '#solutions')} className="hover:text-foreground transition-colors">Our Solutions</a>
          <a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')} className="hover:text-foreground transition-colors">About Us</a>
          <a href="#contact" onClick={handleContactClick} className="hover:text-foreground transition-colors">Contact Us</a>
        </nav>
        
        {/* Desktop: Theme switch + Login */}
        <div className="hidden md:flex items-center gap-4">
          {mounted && (
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-muted-foreground" aria-hidden />
              <Switch
                checked={isDark}
                onCheckedChange={handleThemeToggle}
                aria-label="Toggle dark mode"
              />
              <Moon className="h-4 w-4 text-muted-foreground" aria-hidden />
            </div>
          )}
          <button 
            onClick={handleLoginClick}
            className="bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.3)] text-primary-foreground px-9 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>

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
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden">
          <nav className="flex flex-col text-muted-foreground">
            <a 
              href="#how-it-works" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={(e) => handleNavLinkClick(e, '#how-it-works')}
            >
              How it Works
            </a>
            <a 
              href="#solutions" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={(e) => handleNavLinkClick(e, '#solutions')}
            >
              Our Solutions
            </a>
            <a 
              href="#about" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={(e) => handleNavLinkClick(e, '#about')}
            >
              About Us
            </a>
            <a 
              href="#contact" 
              className="px-6 py-4 hover:bg-accent transition-colors border-b border-border"
              onClick={handleContactClick}
            >
              Contact Us
            </a>
            {mounted && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-sm">Dark mode</span>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" aria-hidden />
                  <Switch
                    checked={isDark}
                    onCheckedChange={handleThemeToggle}
                    aria-label="Toggle dark mode"
                  />
                  <Moon className="h-4 w-4" aria-hidden />
                </div>
              </div>
            )}
            <button 
              onClick={handleLoginClick}
              className="mx-4 my-4 bg-primary shadow-[0px_4px_20px_rgba(0,0,0,0.25),inset_0px_2px_6px_rgba(255,255,255,0.4)] text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
