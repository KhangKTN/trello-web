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
            const newBoard = { ...state.board }
            const cardEmpty = formatterUtil.createPlaceholderCard(column)
            const newColumn = {
                ...column,
                cards: [cardEmpty],
                cardOrderIds: [cardEmpty._id]
            }

            newBoard.columns.push(newColumn)
            newBoard.columnOrderIds.push(newColumn._id)

            return { board: newBoard }
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
