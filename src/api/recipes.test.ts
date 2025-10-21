import { act, renderHook } from '@test-utils';
import { loadRecipes, createRecipe, deleteSingleRecipe, updateRecipe } from "./recipes";
import type { Mock } from 'vitest';
import { supabase } from '@/supabaseClient';

vi.mock('@/supabaseClient', () => ({
    supabase: {
        from: vi.fn()
    },
}));


describe("loadRecipes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads an existing recipe", async () => {
    const mockOrder = vi.fn().mockResolvedValue({
        data: [{ id: 1, title: "Test Recipe" }],
        error: null
    });
    const mockSelect = vi.fn(() => ({ order: mockOrder }));

    (supabase.from as any).mockReturnValue({ select: mockSelect });

    const result = await loadRecipes();

    expect(result).toEqual([{ id: 1, title: "Test Recipe" }]);
    expect(mockSelect).toHaveBeenCalled();
    expect(mockOrder).toHaveBeenCalledWith("title", { ascending: true });
  });
});