import { create } from "zustand";
import { workers } from "@service";
import { WorkersStore } from "@workers-interface";
import { toast } from "react-toastify";
const useWorkerStore = create<WorkersStore>((set) => ({
  data: [],
  isLoading: false,
  totalCount: 1,
  getData: async (params) => {
    try {
      set({ isLoading: true });
      const response = await workers.get_workers(params);
      if (response.status === 200) {
        set({
          totalCount: Math.ceil(response.data?.totcal_count / params.limit),
          data: response?.data?.user,
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  },

  createData: async (data) => {
    try {
      const respons = await workers.create_worker(data);
      console.log(respons);
      if (respons.status === 201) {
        set((state) => ({
          data:
            state.data.length < 8
              ? [...state.data, { ...data, id: respons?.data?.user_id }]
              : [...state.data],
        }));
        set((state) => ({ totalCount: (state.totalCount += 1) }));
        toast.success("success full");
        return respons?.status;
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  },
  
  updateData: async (data) => {
    try {
      const respons = await workers.update_worker(data);
      if (respons?.status === 200) {
        set((state) => ({
          data: state.data.map((el: any) => (el.id === data.id ? data : el)),
        }));
        toast.success("updated successfully");
        return respons?.status;
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Error : " + error?.message);
    }
  },

  deleteData: async (id) => {
    try {
      const respons = await workers.delete_worker(id);
      if (respons.status === 200) {
        set((state) => ({
          data: state.data.filter((el: any) => el.id !== id),
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

export default useWorkerStore;
