import axios from 'axios'
import { API_HOST } from '~/utils/constant.util'

// Simulate time for loading state in DEV env
const TIMEOUT_CALL_IN_MILISECOND = 1000

//  Board
const fetchBoardDetail = async (boardId) => {
    const res = await axios.get(`${API_HOST}/v1/board/${boardId}`)
    return res?.data
}

const updateColumnOrderIds = async (data) => {
    return await axios.put(`${API_HOST}/v1/board/update-column-order-ids`, data)
}

// Column
const addColumn = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, TIMEOUT_CALL_IN_MILISECOND)
    })
    return await axios.post(`${API_HOST}/v1/column`, data)
}

const updateCardOrderIds = async ({ card, sourceColumnId, targetColumnId, cardOrderIds }) => {
    return await axios.put(`${API_HOST}/v1/column/update-card-order-ids`, {
        card,
        sourceColumnId,
        targetColumnId,
        cardOrderIds
    })
}

const deleteColumn = async (columnId) => {
    return await axios.delete(`${API_HOST}/v1/column/${columnId}`)
}

// Card
const addCard = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, TIMEOUT_CALL_IN_MILISECOND)
    })
    return await axios.post(`${API_HOST}/v1/card`, data)
}

const updateCard = async (data) => await axios.put(`${API_HOST}/v1/card`, data)

const deleteCard = async (cardId) => await axios.delete(`${API_HOST}/v1/card/${cardId}`)

export default {
    fetchBoardDetail,
    updateColumnOrderIds,
    addColumn,
    updateCardOrderIds,
    deleteColumn,
    addCard,
    updateCard,
    deleteCard
}
