// FIX: Add React import to fix "Cannot find namespace 'JSX'" error.
import React from 'react';

const FeatureCard: React.FC<{ icon: JSX.Element; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
    <div className="flex justify-center items-center mb-4 h-12 w-12 rounded-full bg-orange-100 mx-auto">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);

export const Welcome: React.FC = () => {
  return (
    <div className="mt-8 text-center bg-orange-50/50 p-8 rounded-2xl border border-dashed border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the AI Recipe Generator!</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Turn your pantry's contents into a culinary adventure. Just list your ingredients, set your preferences, and let our AI chef do the rest.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}
          title="List Your Ingredients"
        >
          Enter what you have on hand, separated by commas. The more you list, the better the recipe!
        </FeatureCard>
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h-2M4 12H2m15.364 6.364l-1.414-1.414M6.343 6.343l-1.414-1.414m12.728 0l-1.414 1.414M6.343 17.657l-1.414 1.414M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          title="Set Preferences"
        >
          Have dietary needs or craving a specific cuisine? Let us know in the optional fields.
        </FeatureCard>
        <FeatureCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L8 9l11-4-5 10z" /></svg>}
          title="Get Inspired"
        >
          Receive a full recipe with instructions and a beautiful AI-generated image of your dish.
        </FeatureCard>
      </div>
    </div>
  );
};
