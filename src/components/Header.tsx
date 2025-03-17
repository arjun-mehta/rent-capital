import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Set loaded state after a small delay for animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadTimer);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Qualification", href: "#who-we-help" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4",
        isScrolled 
          ? "bg-[#FCF7F0]/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            className={cn(
              "flex items-center z-10 transition-all duration-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <span className="text-xl font-poppins font-semibold tracking-tight">Creator Capital</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover-underline hover:text-black transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="bg-[#017354] hover:bg-[#017354]/90 text-white"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Apply Now
            </Button>
          </nav>

          {/* Mobile Navigation Trigger */}
          <button
            className="md:hidden z-10 p-2 focus:outline-none"
            onClick={handleMenuToggle}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation Menu */}
          <div
            className={cn(
              "fixed inset-0 bg-white flex flex-col justify-center items-center transition-all duration-300 ease-in-out md:hidden",
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <nav className="flex flex-col items-center space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xl font-medium text-gray-800 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                className="bg-[#017354] hover:bg-[#017354]/90 text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                Apply Now
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
