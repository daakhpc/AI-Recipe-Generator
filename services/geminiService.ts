
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe, UserPreferences } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "Creative and appealing name for the recipe." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish." },
    prepTime: { type: Type.STRING, description: "e.g., '15 minutes'" },
    cookTime: { type: Type.STRING, description: "e.g., '30 minutes'" },
    servings: { type: Type.STRING, description: "e.g., '4 servings'" },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of all ingredients required, including quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step cooking instructions."
    },
  },
  required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
};

export const generateRecipe = async (
  ingredients: string,
  preferences: UserPreferences
): Promise<Recipe> => {
  const prompt = `
    You are a world-class chef who excels at creating delicious and accessible recipes from a limited set of ingredients.
    A user has the following ingredients available: ${ingredients}.
    Their preferences are:
    - Dietary Restrictions: ${preferences.dietaryRestrictions || 'None'}
    - Desired Cuisine: ${preferences.cuisineType || 'Any'}
    - Meal Type: ${preferences.mealType || 'Any'}

    Please generate a single, complete recipe based on this information. 
    - The recipe name must be creative and appealing.
    - The description should be enticing.
    - You must list ALL ingredients needed, including the ones provided by the user and any additional common pantry staples required (like oil, salt, pepper, etc.).
    - Instructions should be clear, concise, and easy for a home cook to follow.
    
    If the provided ingredients are insufficient or nonsensical for creating a cohesive dish, your response for "recipeName" should be "Error: Insufficient Ingredients" and the description should explain why.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const recipeData = JSON.parse(jsonText);
    
    // Basic validation
    if (!recipeData.recipeName || !recipeData.ingredients || !recipeData.instructions) {
      throw new Error("Invalid recipe format received from API.");
    }
    
    return recipeData as Recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe from the Gemini API.");
  }
};


export const generateRecipeImage = async (recipeName: string, description: string): Promise<string> => {
    const prompt = `A vibrant, professional food photograph of "${recipeName}". ${description}. The dish should look incredibly delicious, beautifully plated on modern dinnerware. Use natural, soft lighting to highlight the textures of the food. Shallow depth of field to make the dish pop.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '4:3',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating recipe image:", error);
        // Return a placeholder or throw an error
        throw new Error("Failed to generate recipe image from the Gemini API.");
    }
};
