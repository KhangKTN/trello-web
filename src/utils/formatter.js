export const capitalizeFirstLetter = (val) => {
    val = val.trim()
    if (!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}