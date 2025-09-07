import { NewRecipe, RecipeFormValues } from "@/types/recipe";
import { sanitiseForInsert } from "./sanitiseForRecipeInsert";

describe("sanitise for insert", () => {

    const testInput: RecipeFormValues = {
        title: "Chicken Tikka",
        description: "A tasty curry",
        ingredients: [],
        instructions: "No instructions",
        cuisine: ["British"],
        commonCarbohydrate: "Rice",
        prepTimeMinutes: 10,
        servings: 2,
        imageUrl: "",
        recipeUrl: "https://www.mytestrecipe.com"
    };

    it("applies sanitisation to a test example", () => {
        const expectedResult: NewRecipe = {
            title: "Chicken Tikka",
            description: "A tasty curry",
            prep_time_minutes: 10,
            servings: 2,
            ingredients: [],
            instructions: "No instructions",
            common_carbohydrate: "Rice",
            image_url: "",
            recipe_url: "https://www.mytestrecipe.com"
        };
        const result = sanitiseForInsert(testInput);
        expect(result).toStrictEqual(expectedResult);
    })

    it("doesn't mutate the input", () => {
        const inputCopy = { ...testInput };
        sanitiseForInsert(testInput);
        expect(testInput).toStrictEqual(inputCopy);
    })
})