import { create } from "zustand";
import { categories } from "@service";
import { CategoriesStore } from "@categories-interface";
const useCategoryStore = create<CategoriesStore>((set) => ({
  data: [],
  isLoading: false,
  totalCount: 1,
  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await categories.get_categories(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.total_count / params.limit),
          data: response?.data?.categories,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  createData: async (data) => {
    try {
      const response = await categories.create_category(data);
      if (response.status === 201) {
        set((state) => ({
          data:
            state.data.length < 10
              ? [...state.data, response.data]
              : [...state.data],
        }));
        return response.status;
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useCategoryStore;
