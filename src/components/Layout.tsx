
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Disclaimer } from './Disclaimer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-vmm-blue text-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-white">
                <span className="text-vmm-magenta">VMM</span> Careers
              </div>
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
                  <Link to="/result" className="text-white hover:text-vmm-magenta transition-colors">Check Result</Link>
                </li>
                <li>
                  <Link to="/topper-list" className="text-white hover:text-vmm-magenta transition-colors">Toppers</Link>
                </li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button className="p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
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
