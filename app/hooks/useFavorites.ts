import { create } from 'zustand';
import axios from 'axios';

interface State {
  favorites: string[] | null;
}

type Actions = {
  setFavorites: (favorites: string[]) => void;
  updateFavorites: (id: string) => void;
  checkFavorites: (id: string) => boolean | undefined;
};

const initialState = {
  favorites: null,
};

const useFavorites = create<State & Actions>((set, get) => ({
  favorites: initialState.favorites,
  setFavorites: (favorites) => set(() => ({ favorites })),
  checkFavorites: (id) => get().favorites?.includes(id),
  updateFavorites: async (id) => {
    if (get().checkFavorites(id)) {
      set((state) => ({
        favorites: state.favorites?.filter((fav) => fav !== id),
      }));
    } else {
      set((state) => ({
        favorites: state.favorites ? [...state.favorites, id] : [id],
      }));
    }
    await axios.post(`/api/favorites/${id}`, { newFavIds: get().favorites });
  },
}));

export default useFavorites;
