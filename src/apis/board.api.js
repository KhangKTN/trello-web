import axios from 'axios'
import { API_HOST } from '~/utils/constant.util'

// Simulate time for loading state in DEV env
const TIMEOUT_CALL_IN_MILISECOND = 1000

const fetchBoardDetail = async (boardId) => {
    await new Promise((resolve) => {
        setTimeout(resolve, TIMEOUT_CALL_IN_MILISECOND)
    })
    const res = await axios.get(`${API_HOST}/v1/board/${boardId}`)
    return res.data
}

const addColumn = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, TIMEOUT_CALL_IN_MILISECOND)
    })
    return await axios.post(`${API_HOST}/v1/column`, data)
}

const addCard = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, TIMEOUT_CALL_IN_MILISECOND)
    })
    return await axios.post(`${API_HOST}/v1/card`, data)
}

const updateColumnOrderIds = async (data) => {
    return await axios.put(`${API_HOST}/v1/board/update-column-order-ids`, data)
}

const updateCardOrderIds = async ({ card, sourceColumnId, targetColumnId, cardOrderIds }) => {
    return await axios.put(`${API_HOST}/v1/column/update-card-order-ids`, {
        card,
        sourceColumnId,
        targetColumnId,
        cardOrderIds
    })
}

const updateCard = async (data) => await axios.put(`${API_HOST}/v1/card`, data)

export default { fetchBoardDetail, addColumn, addCard, updateColumnOrderIds, updateCardOrderIds, updateCard }
