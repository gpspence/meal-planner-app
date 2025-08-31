import { Json } from "@/types/database.types";
import { Ingredient, RecipeCuisineWithName, RecipeInsert } from "@/types/recipe";
import { Table } from "@mantine/core";
import { cleanTitle } from '@/utils/strings'


function checkRow(key: string, value: unknown): boolean {
    const hiddenProps = ['id'];
    const isNotEmpty: boolean = !!value && (Array.isArray(value) ? value.length !== 0 : true);
    const isNotHidden: boolean = !hiddenProps.includes(key);
    return isNotEmpty && isNotHidden;
}

function formatUrlDisplay(url: string, withPath: boolean = false): string {
    try {
        const u = new URL(url);
        return withPath ? u.hostname + u.pathname : u.hostname
    } catch {
        return url
    }
}

function cleanStrings(key: string, value: string) {
    const urlProps = ["image_url", "recipe_url"]
    const timeProps = ["created_at", "updated_at"]
    if (urlProps.includes(key)) {
        const withPath = (key === 'recipe_url');
        return (
            <a href={value} target='_blank' rel='noopener noreferrer'>
                {formatUrlDisplay(value, withPath)}
            </a>
        )
    } else if (timeProps.includes(key)) {
        return new Date(value).toLocaleString()
    }
    return value
}

const isIngredient = (value: any): value is Ingredient => !!value?.name

function cleanIngredients(ingredients: Ingredient[]): string {
    return ingredients
        .map(({ name, note, unit, quantity }) =>
            [quantity, unit, name, note ? `${note}` : ''].filter(Boolean).join(' ')
        )
        .join('; ');
}

function cleanProps(key: string, value: string | Json) {
    if (value === null) {return ""}
    if (typeof value === 'string' || typeof value === 'number') {
        return cleanStrings(key, String(value));
    }
    if (
        key === 'ingredients' &&
        Array.isArray(value) &&
        value.every(elem => isIngredient(elem as Ingredient))
    ) {
        return cleanIngredients(value as Ingredient[]);
    }
    if (key === 'recipe_cuisines') {
        const cuisineArray: string[] = (value as RecipeCuisineWithName[])
            .map(rc => rc.cuisines.name);
        const cuisineString: string = cuisineArray.join(", ")
        return cuisineString;
    }
    return String(value) // fallback
}


export function useRecipeOverlay(recipe: RecipeInsert) {
    const tableRows = Object.entries(recipe).map(([key, value]) => (
        checkRow(key, value) ? (
            <Table.Tr key={key}>
                <Table.Td style={{ fontWeight: 600 }}>{cleanTitle(String(key))}</Table.Td>
                <Table.Td>{cleanProps(key, value)}</Table.Td>
            </Table.Tr>
        ) : null
    ));

    return { tableRows };
}