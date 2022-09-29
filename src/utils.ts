export const getRandomValue = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

export const randomNumberBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

export const toFixedDigitString = (num: number, minLength: number): string => num.toString().padStart(minLength, '0')
