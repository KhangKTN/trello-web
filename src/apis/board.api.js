import axios from 'axios'
import { API_HOST } from '~/utils/constant.util'

const fetchBoardDetail = async (boardId) => {
    const res = await axios.get(`${API_HOST}/v1/board/${boardId}`)
    return res.data
}

const addColumn = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
    return await axios.post(`${API_HOST}/v1/column`, data)
}

const addCard = async (data) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000)
    })
    return await axios.post(`${API_HOST}/v1/card`, data)
}

const updateColumnOrderIds = async (data) => {
    return await axios.put(`${API_HOST}/v1/board/update-column-order-ids`, data)
}

export default { fetchBoardDetail, addColumn, addCard, updateColumnOrderIds }
