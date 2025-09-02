
import React from 'react';
import type { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
  imageUrl: string | null;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 animate-fade-in">
      <div className="h-64 md:h-80 w-full bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={recipe.recipeName} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center text-gray-500">
            Generating image...
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h2>
        <p className="text-gray-600 mb-6 italic">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-4 md:gap-6 mb-8 text-center border-t border-b border-gray-200 py-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Prep Time</p>
            <p className="text-lg font-semibold text-orange-600">{recipe.prepTime}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Cook Time</p>
            <p className="text-lg font-semibold text-orange-600">{recipe.cookTime}</p>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Servings</p>
            <p className="text-lg font-semibold text-orange-600">{recipe.servings}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-400 pb-2">Ingredients</h3>
            <ul className="space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 mr-2 mt-1 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-400 pb-2">Instructions</h3>
            <ol className="space-y-4 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 bg-orange-500 text-white font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 text-sm">{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
