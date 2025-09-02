
import React, { useState } from 'react';
import type { UserPreferences } from '../types';

interface RecipeFormProps {
  onGenerate: (ingredients: string, preferences: UserPreferences) => void;
  isLoading: boolean;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: '',
    cuisineType: '',
    mealType: '',
  });

  const handleInputChange = <K extends keyof UserPreferences,>(
    field: K,
    value: UserPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onGenerate(ingredients, preferences);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="ingredients" className="block text-lg font-semibold text-gray-700 mb-2">
              What ingredients do you have?
            </label>
            <textarea
              id="ingredients"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
              placeholder="e.g., chicken breast, broccoli, rice, soy sauce"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500 mt-1">Separate ingredients with commas for best results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="diet" className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Needs
              </label>
              <input
                type="text"
                id="diet"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="e.g., Vegan, Gluten-Free"
                value={preferences.dietaryRestrictions}
                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine Type
              </label>
              <input
                type="text"
                id="cuisine"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="e.g., Italian, Mexican"
                value={preferences.cuisineType}
                onChange={(e) => handleInputChange('cuisineType', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="meal" className="block text-sm font-medium text-gray-700 mb-1">
                Meal Type
              </label>
              <input
                type="text"
                id="meal"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                placeholder="e.g., Dinner, Lunch"
                value={preferences.mealType}
                onChange={(e) => handleInputChange('mealType', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isLoading || !ingredients.trim()}
            className="w-full md:w-auto inline-flex items-center justify-center px-12 py-3 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {isLoading ? 'Crafting Recipe...' : 'Generate Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};
