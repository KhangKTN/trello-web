import { create } from 'zustand'

// Save columns have add new card to handle scroll to bottom
const useColumnsAddCardStore = create((set) => ({
    columnIds: [],
    changeColumnIds: (columnId) =>
        set((state) => {
            const columnIds = state.columnIds
            return { columnIds: [...new Set([...columnIds, columnId])] }
        })
}))

export default useColumnsAddCardStore
