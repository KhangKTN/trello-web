import axios from 'axios'
import { API_HOST } from '~/utils/constant.util'

const fetchBoardDetail = async (boardId) => {
    const res = await axios.get(`${API_HOST}/v1/board/${boardId}`)
    return res.data
}

export default { fetchBoardDetail }
