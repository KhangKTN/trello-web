import { create } from 'zustand'
import boardApi from '~/apis/board.api'
import { BOARD_ID } from '~/pages/Boards/_id'
import formatterUtil from '~/utils/formatter.util'

const useBoardStore = create((set) => ({
    board: null,
    fetchData: async () => {
        try {
            const res = await boardApi.fetchBoardDetail(BOARD_ID)
            set({ board: res.data })
        } catch (error) {
            set({ board: null })
        }
    },
    addColumn: (column) =>
        set((state) => {
            const board = { ...state.board }

            // Create hidden card to can drag and drop from other column
            const hiddenCard = formatterUtil.createPlaceholderCard(column)
            const newColumn = {
                ...column,
                cards: [hiddenCard],
                cardOrderIds: [hiddenCard._id]
            }

            board.columns.push(newColumn)
            board.columnOrderIds.push(newColumn._id)

            return { board }
        }),
    addCard: (card) =>
        set((state) => {
            const newBoard = { ...state.board }
            const columnContainCard = newBoard.columns.find((col) => col._id === card.columnId)

            columnContainCard.cards.push(card)
            columnContainCard.cardOrderIds.push(card._id)

            return { board: newBoard }
        })
}))

export default useBoardStore
