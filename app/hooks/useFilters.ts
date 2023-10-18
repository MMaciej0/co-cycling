import { create } from 'zustand';

type Filters = {
  maxDistance: number | string;
  rideType: string;
  sorting: string;
};

type State = {
  filters: Filters;
};

export type Key = keyof Filters;

type Actions = {
  setNewValue: (stateName: Key, newValue: Filters[Key]) => void;
  setDefaultValue: (stateName: Key) => void;
  resetFilters: () => void;
};

const initialState = {
  maxDistance: '',
  rideType: '',
  sorting: '',
};

const useFilters = create<State & Actions>((set) => ({
  filters: initialState,
  setNewValue: (stateName, newValue) =>
    set((state) => ({
      filters: { ...state.filters, [stateName]: newValue },
    })),
  setDefaultValue: (stateName) =>
    set((state) => ({
      filters: { ...state.filters, [stateName]: initialState[stateName] },
    })),
  resetFilters: () => set({ filters: initialState }),
}));

export default useFilters;
