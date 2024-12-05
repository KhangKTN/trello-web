export const capitalizeFirstLetter = (val) => {
    val = val.trim()
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/*
    Create new empty card (placeholder-card) and it will invisible
    Purpose is keep least 1 card in empty column to can drag card form other column drop into
*/
export const createPlaholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        isPlaceholder: true
    }
}