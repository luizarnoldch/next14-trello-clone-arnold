import { create } from "zustand";

interface ContentModalState {
  id?: string;
  boardId?: string;
  isOpen: boolean;
  onOpen: (id: string, boardId: string) => void;
  onClose: () => void;
}

export const useContentModal = create<ContentModalState>()((set) => ({
  id: undefined,
  boardId: undefined,
  isOpen: false,
  onOpen: (id, boardId) => set({ isOpen: true, id: id, boardId: boardId }),
  onClose: () => set({ isOpen: false, id: undefined, boardId: undefined }),
}));
