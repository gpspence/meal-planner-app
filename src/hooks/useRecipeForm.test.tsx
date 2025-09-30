import { act, renderHook } from '@test-utils';
import type { Mock } from 'vitest';
import { notifications } from '@mantine/notifications';
import { createRecipe, updateRecipe } from '@/api/recipes';
import { RecipeFormValues } from '@/types/recipe';
import { useRecipeForm } from './useRecipeForm';

// Mock modules
vi.mock('@/api/recipes');
vi.mock('@mantine/notifications');

describe('useRecipeForm', () => {
  const onSuccess = vi.fn();
  const close = vi.fn();
  const testFormValues: RecipeFormValues = {
    title: 'Spaghetti Carbonara',
    description: 'An Italian dish',
    imageUrl: 'https://example.com/image.jpg',
    recipeUrl: 'https://example.com/recipes/42',
    instructions: '',
    cuisine: ['Italian'],
    prepTimeMinutes: 10,
    servings: 2,
    commonCarbohydrate: 'pasta',
    ingredients: [
      { name: 'Spaghetti', unit: 'g', quantity: 200, note: '' },
      { name: 'Pancetta', unit: '', quantity: 1, note: 'diced' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes the form with correct default values', () => {
    const { result } = renderHook(() => useRecipeForm(onSuccess, close));
    expect(result.current.form.getValues()).toMatchObject({
      title: '',
      description: '',
      ingredients: [],
      instructions: '',
      cuisine: [],
      commonCarbohydrate: '',
      prepTimeMinutes: 0,
      servings: 1,
      imageUrl: '',
      recipeUrl: '',
    });
    expect(result.current.selectedCuisineIds).toEqual([]);
  });

  it('updates cuisine state', () => {
    const { result } = renderHook(() => useRecipeForm(onSuccess, close));
    act(() => {
      result.current.setSelectedCuisineIds(['Italian']);
    });
    expect(result.current.selectedCuisineIds).toEqual(['Italian']);
  });

  it('handles successful create', async () => {
    (createRecipe as Mock).mockResolvedValueOnce({});
    const { result } = renderHook(() => useRecipeForm(onSuccess, close, 'create'));
    await act(async () => {
      await result.current.handleSubmit(testFormValues);
    });
    expect(createRecipe).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Recipe created successfully!' })
    );
    expect(onSuccess).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });

  it('handles successful edit', async () => {
    (updateRecipe as Mock).mockResolvedValueOnce({});
    const { result } = renderHook(() => useRecipeForm(onSuccess, close, 'edit', '1'));
    await act(async () => {
      await result.current.handleSubmit(testFormValues);
    });
    expect(updateRecipe).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Recipe updated successfully!' })
    );
    expect(onSuccess).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });

  it('handles error in updateRecipe', async () => {
    (updateRecipe as Mock).mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useRecipeForm(onSuccess, close, 'edit', '123'));
    await act(async () => {
      await result.current.handleSubmit(testFormValues);
    });
    expect(updateRecipe).toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Recipe update failed.' })
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
