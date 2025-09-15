
export const DateFormat = (date: Date) => {

    const hours = date.getHours();
    const hoursWithFormat = hours % 12 ? (hours % 12 < 10 ? `0${hours % 12}` : `${hours % 12}`) : '12';
    const minuts = date.getMinutes()
    const minutsWithFormat = minuts < 10 ? `0${minuts}` : `${minuts}`

    return {
        hours: hoursWithFormat,
        minuts: minutsWithFormat
    }
}
