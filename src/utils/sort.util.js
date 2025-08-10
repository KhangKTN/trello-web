const sortArrayByOtherArray = (currentArray, sortedArray, orderBy) => {
    if (!currentArray?.length || !sortedArray?.length || !orderBy) {
        return []
    }
    return [...currentArray].sort((a, b) => sortedArray.indexOf(a[orderBy]) - sortedArray.indexOf(b[orderBy]))
}

export default { sortArrayByOtherArray }
