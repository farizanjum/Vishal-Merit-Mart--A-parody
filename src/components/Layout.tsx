
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Disclaimer } from './Disclaimer';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-vmm-blue text-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.ibb.co/203Mn8tx/Vishal-Merit-Mart.png" 
                alt="VMM Careers" 
                className="h-10"
              />
            </Link>
            <nav className="hidden md:block">
              <ul className="flex gap-6">
                <li>
                  <Link to="/" className="text-white hover:text-vmm-magenta transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/mock-test" className="text-white hover:text-vmm-magenta transition-colors">Mock Test</Link>
                </li>
                <li>
                  <Link to="/exam" className="text-white hover:text-vmm-magenta transition-colors">Real Exam</Link>
                </li>
                <li>
                  <Link to="/cutoff" className="text-white hover:text-vmm-magenta transition-colors">Cutoffs</Link>
                </li>
                <li>
                  <Link to="/result" className="text-white hover:text-vmm-magenta transition-colors">Check Result</Link>
                </li>
                <li>
                  <Link to="/topper-list" className="text-white hover:text-vmm-magenta transition-colors">Toppers</Link>
                </li>
                <li>
                  <Link to="/meme-generator" className="text-white hover:text-vmm-magenta transition-colors">Meme Generator</Link>
                </li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button className="p-2 text-white" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <nav className="flex flex-col space-y-3">
                <Link to="/" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Home
                </Link>
                <Link to="/mock-test" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Mock Test
                </Link>
                <Link to="/exam" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Real Exam
                </Link>
                <Link to="/cutoff" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Cutoffs
                </Link>
                <Link to="/result" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Check Result
                </Link>
                <Link to="/topper-list" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Toppers
                </Link>
                <Link to="/meme-generator" className="text-white hover:text-vmm-magenta transition-colors" onClick={toggleMobileMenu}>
                  Meme Generator
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="overflow-hidden bg-vmm-magenta text-white py-1">
        <div className="whitespace-nowrap animate-marquee">
          🔥 14,000+ candidates already registered. Limited seats available! 🔥
        </div>
      </div>

      <main className={cn("flex-grow container mx-auto px-4 py-6", className)}>
        {children}
      </main>

      <footer className="bg-vmm-blue text-white py-6">
        <div className="container mx-auto px-4">
          <Disclaimer />
          <div className="mt-4 text-center text-sm text-gray-200">
            © 2025 VMM Careers (Parody) | For entertainment purposes only
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
