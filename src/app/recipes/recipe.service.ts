import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     ' Tasty Schnitzel',
  //     'A super tasty Schnitzel with french fries.',
  //     'https://previews.123rf.com/images/peteers/peteers1412/peteers141200002/34166986-schnitzel-with-french-fries-and-a-spicy-dip-fresh-from-red-orange.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 50)
  //     ]),
  //   new Recipe(
  //     'Super Salad',
  //     'A tasty salad which looks after your calories.',
  //     'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/199808.jpg',
  //     [
  //       new Ingredient('Salad mix', 1),
  //       new Ingredient('Dressing', 1),
  //       new Ingredient('Broccoli', 5)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
