
export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
}

export interface UserPreferences {
  dietaryRestrictions: string;
  cuisineType: string;
  mealType: string;
}
