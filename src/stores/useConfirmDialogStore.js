import { create } from 'zustand'

const useConfirmDialogStore = create((set) => ({
    isOpen: false,
    title: '',
    content: '',
    action: null,

    toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
    change: ({ isOpen, title, content, action }) =>
        set((state) => {
            return { ...state, isOpen, title, content, action }
        })
}))

export default useConfirmDialogStore
