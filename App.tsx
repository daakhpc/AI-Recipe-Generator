
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { RecipeForm } from './components/RecipeForm';
import { RecipeDisplay } from './components/RecipeDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateRecipe, generateRecipeImage } from './services/geminiService';
import type { Recipe, UserPreferences } from './types';
import { Welcome } from './components/Welcome';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async (ingredients: string, preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setRecipeImage(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients, preferences);
      setRecipe(generatedRecipe);

      if (generatedRecipe && !generatedRecipe.recipeName.toLowerCase().includes('error')) {
        const imageUrl = await generateRecipeImage(generatedRecipe.recipeName, generatedRecipe.description);
        setRecipeImage(imageUrl);
      } else if (generatedRecipe) {
        // Handle cases where Gemini indicates an error in the recipe name
        setError("Could not generate a recipe with the provided ingredients. Please try again with different ingredients.");
        setRecipe(null); // Clear the recipe if it was an error response
      }

    } catch (e) {
      console.error(e);
      setError('An unexpected error occurred. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <RecipeForm onGenerate={handleGenerateRecipe} isLoading={isLoading} />
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Oh no! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {!isLoading && !recipe && !error && <Welcome />}

          {recipe && (
            <div className="mt-8">
              <RecipeDisplay recipe={recipe} imageUrl={recipeImage} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini. Recipes and images are AI-generated.</p>
      </footer>
    </div>
  );
};

export default App;
