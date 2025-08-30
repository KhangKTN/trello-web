import { create } from 'zustand'
import boardApi from '~/apis/board.api'
import { BOARD_ID } from '~/pages/Boards/_id'

const useFetchBoardStore = create((set) => ({
    board: null,
    fetchData: async () => {
        try {
            const res = await boardApi.fetchBoardDetail(BOARD_ID)
            set({ board: res.data })
        } catch (error) {
            set({ board: null })
        }
    }
}))

export default useFetchBoardStore
