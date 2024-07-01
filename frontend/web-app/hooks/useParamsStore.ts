import { createWithEqualityFn } from "zustand/traditional";

export type State = {
  pageNumber: number;
  pageSize: 4 | 8 | 12;
  pageCount: number;
  searchTerm: string;
  searchValue: string;
  orderBy: "make" | "endingSoon" | "new";
  filterBy: "live" | "endingSoon" | "finished";
  seller?: string;
  winner?: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
  setSearchValue: (value: string) => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: "",
  searchValue: "",
  orderBy: "make",
  filterBy: "live",
  seller: undefined,
  winner: undefined,
};

export const useParamsStore = createWithEqualityFn<State & Actions>()(
  (set) => ({
    ...initialState,
    setParams: (newParams: Partial<State>) => {
      set((state) => {
        if (newParams.pageNumber) {
          return { ...state, pageNumber: newParams.pageNumber };
        } else {
          return { ...state, ...newParams, pageNumber: 1 };
        }
      });
    },
    reset: () => set(initialState),
    setSearchValue: (value: string) => set({ searchValue: value }),
  }),
);
