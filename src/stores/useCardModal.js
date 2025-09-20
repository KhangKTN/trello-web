import { create } from 'zustand'

const useCardModal = create((set) => ({
    isOpen: false,
    columnId: null,
    card: null,

    toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
    change: ({ isOpen, columnId, card }) =>
        set((state) => {
            return { ...state, isOpen, columnId, card }
        })
}))

export default useCardModal
