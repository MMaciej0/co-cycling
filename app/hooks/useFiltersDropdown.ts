import { create } from 'zustand';

type State = {
  isOpen: boolean;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
  forceStatus: (status: boolean) => void;
};

const useFiltersDropdown = create<State & Actions>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  forceStatus: (status) => set({ isOpen: status }),
}));

export default useFiltersDropdown;
