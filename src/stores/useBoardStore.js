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

    // Column
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
    deleteColumn: async (columnId) => {
        // Call api delete Column

        // Update state
        set((state) => {
            const newBoard = { ...state.board }
            newBoard.columns = newBoard.columns.filter((col) => col._id !== columnId)
            return { board: newBoard }
        })
    },

    // Card
    addCard: (card) =>
        set((state) => {
            const newBoard = { ...state.board }
            const columnContainCard = newBoard.columns.find((col) => col._id === card.columnId)

            if (columnContainCard?.cards?.length === 1 && columnContainCard.cards[0]?.isPlaceholder) {
                columnContainCard.cards = [{ ...card }]
                columnContainCard.cardOrderIds = [card._id]
            } else {
                columnContainCard.cards.push(card)
                columnContainCard.cardOrderIds.push(card._id)
            }

            return { board: newBoard }
        }),
    updateCard: (card) =>
        set((state) => {
            const newBoard = { ...state.board }

            newBoard.columns = newBoard.columns.map((col) => {
                if (col._id !== card.columnId) {
                    return col
                }

                return {
                    ...col,
                    cards: col.cards.map((cardItem) =>
                        cardItem._id === card._id ? { ...cardItem, title: card.title, image: card.image } : cardItem
                    )
                }
            })

            return { board: newBoard }
        }),
    deleteCard: async (card) => {
        // Call api delete Card
        try {
            await boardApi.deleteCard(card._id)
        } catch (error) {
            return
        }

        // Update state
        set((state) => {
            const newBoard = { ...state.board }

            newBoard.columns = newBoard.columns.map((col) => {
                if (col._id !== card.columnId) {
                    return col
                }

                const isLastCard = col.cards.length === 1
                if (isLastCard) {
                    const placeholderCard = formatterUtil.createPlaceholderCard(col)
                    return { ...col, cards: [placeholderCard], cardOrderIds: [placeholderCard._id] }
                }
                return {
                    ...col,
                    cards: col.cards.filter((cardItem) => cardItem._id !== card._id),
                    cardOrderIds: col.cardOrderIds.filter((c) => c !== card._id)
                }
            })

            return { board: newBoard }
        })
    }
}))

export default useBoardStore
