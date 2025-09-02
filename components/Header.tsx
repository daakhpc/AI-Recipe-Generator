
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6c0 1.887.842 3.58 2.162 4.685C4.301 13.98 3 15.683 3 17.5V18h14v-.5c0-1.817-1.301-3.52-3.162-4.815A5.984 5.984 0 0016 8a6 6 0 00-6-6zM8.5 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM10 4a4 4 0 014 4c0 .8-.255 1.54-.688 2.146C12.68 10.04 11.38 10 10 10c-1.38 0-2.68.04-3.312.146A3.983 3.983 0 016 8a4 4 0 014-4z" />
        </svg>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
          AI Recipe Generator
        </h1>
      </div>
    </header>
  );
};
