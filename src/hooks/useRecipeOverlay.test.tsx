import { render, screen } from '@test-utils'
import { RecipeCuisineWithName, RecipeWithCuisines } from "@/types/recipe";
import { useRecipeOverlay, __test__ } from "./useRecipeOverlay";
import { Table } from '@mantine/core';
import { cleanTitle } from '@/utils/strings';

/**
 * Test-only host component for rendering the `useRecipeOverlay` hook output.
 * 
 * Wraps the hook inside a Mantine `<Table>` so that its returned `tableRows`
 * (which are `<Table.Tr>` elements) can be rendered and asserted in tests.
 *
 * @param recipe - The recipe object passed into the `useRecipeOverlay` hook.
 * @returns A Mantine `<Table>` element containing the rows produced by the hook.
 */
function HookHost({ recipe }: { recipe: RecipeWithCuisines }) {
    const { tableRows } = useRecipeOverlay(recipe);
    return (
        <Table>
            <tbody>{tableRows}</tbody>
        </Table>
    );
}

const { cleanProps, formatUrlDisplay } = __test__;


describe("useRecipeOverlay", () => {
    const exampleRecipeCuisines: RecipeCuisineWithName[] =
        [
            {
                cuisine_id: 'cuisine-123',
                recipe_id: 'recipe-456',
                cuisines: {
                    id: 'cuisine-123',
                    name: 'Italy'
                }
            },
            {
                cuisine_id: 'cuisine-789',
                recipe_id: 'recipe-456',
                cuisines: {
                    id: 'cuisine-789',
                    name: 'France'
                }
            }
        ];

    const recipe: RecipeWithCuisines = {
        id: 'recipe-456',
        title: 'Spaghetti Carbonara',
        description: 'An Italian dish',
        image_url: 'https://example.com/image.jpg',
        recipe_url: 'https://example.com/recipes/42',
        instructions: null,
        prep_time_minutes: 10,
        servings: 2,
        common_carbohydrate: "pasta",
        ingredients: [
            { name: 'Spaghetti', unit: 'g', quantity: 200 },
            { name: 'Pancetta', note: 'diced' },
        ],
        added_by: 'test user',
        created_at: '2020-01-01T00:00:00.000Z',
        updated_at: '2020-01-01T00:00:00.000Z',
        recipe_cuisines: exampleRecipeCuisines
    };


    it('hides id and null fields', () => {
        render(<HookHost recipe={recipe} />);
        expect(screen.queryByText(cleanTitle('id'))).not.toBeInTheDocument();
        expect(screen.queryByText(cleanTitle('instructions'))).not.toBeInTheDocument();
    })

    it('renders name field', () => {
        render(<HookHost recipe={recipe} />);
        expect(screen.getByText('Spaghetti Carbonara')).toBeInTheDocument();
    })

    it('renders cuisines', () => {
        render(<HookHost recipe={recipe} />);
        expect(screen.getByText('Italy, France')).toBeInTheDocument();
    });

    it("displays URLs which can't be processed by URL()", () => {
        const recipeWithInvalidURL = { ...recipe }
        recipeWithInvalidURL.recipe_url = "not-a-url";
        render(<HookHost recipe={recipeWithInvalidURL} />);
        expect(screen.getByText('not-a-url')).toBeInTheDocument();
    })

    it("cleanProps returns an empty string when given null", () => {
        expect(cleanProps('testKey', null)).toBe('');
    })

    it('cleanProps falls back to String(value) for unmatched objects', () => {
        const obj = { foo: 'bar' };
        expect(cleanProps('testKey', obj)).toBe(String(obj));
    })
});