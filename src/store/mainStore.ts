import { create } from "zustand";

interface MainStoreState {
  id: string;
  setPageName: (id: string) => void;
}

const MainStore = create<MainStoreState>((set) => ({
  id: "",
  setPageName: (id) => set({ id: id }),
}));

export default MainStore;
