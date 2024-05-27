import { create } from "zustand";
import { products } from "@service";
import { ProductsStore } from "@products-interface";
import { toast } from "react-toastify";
const useProductStore = create<ProductsStore>((set) => ({
  data: [],
  productData: [],
  photosData: [],
  isLoading: false,
  totalCount: 1,

  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await products.get_products(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data.total_count / params.limit),
          data: response?.data?.products,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        totalCount: 0,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  createData: async (data) => {
    try {
      const response = await products.create_product(data);
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

  getProduct: async (id) => {
    try {
      set({ isLoading: true });
      const response = await products.get_product(id);
      if (response.status === 200) {
        set({
          productData: response?.data,
        });
        return response?.data
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  getPhotos: async (id) => {
    try {
      set({ isLoading: true });
      const response = await products.get_photo(id);
      if (response.status === 200) {
        set({
          photosData: response?.data?.images,
        });
      }
    } catch (error) {
      console.error("Error fetching product img data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  uploadPhoto: async (data) => {
    try {
      set({ isLoading: true });
      const response = await products.upload_photo(data);
      if (response.status === 200) {
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      console.error("Error fetching product img data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateProduct: async (data) => {
    try {
      const respons = await products.update_product(data);
      if (respons?.status === 200) {
        set((state) => ({
          data: state.data.map((el: any) =>
            el.product_id === data.product_id ? data : el
          ),
        }));
        toast.success("updated successfully");
        return respons?.status;
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  },

  deleteProduct: async (id) => {
    try {
      const respons = await products.delete_product(id);
      if (respons.status === 200) {
        set((state) => ({
          data: state.data.filter((el: any) => el.product_id !== id),
        }));
        set((state) => ({ totalCount: (state.totalCount -= 1) }));
        toast.success("Deleted successfully");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  },
}));

export default useProductStore;
