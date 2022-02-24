export function getRandomNumber(min, max) {
    //TODO return a random number in the range [min-max]
    min > max ? max = [min, min = max][0] : true;
    return Math.floor(Math.random() * (Math.floor(max) + 1 - Math.ceil(min))) + min;
}

export function getRandomElement(array) {
    //TODO return a random element of array
    return array[getRandomNumber(0, array.length-1)]
}

export function getRandomDate(minYear, maxYear) {
    //TODO return random Date object (see constructor of the standard class Date)
    //const date = new Date(year, month, day) 
    const year = getRandomNumber(minYear, maxYear);
    const month = getRandomNumber(1, 12);
    const day = getRandomNumber(1,28);
    const date = new Date(`${year},${month},${day}`)
    return date.toLocaleDateString()
}

