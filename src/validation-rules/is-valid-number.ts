export const isValidNumber = (nino: string): boolean => {
  const number = nino.slice(2, 8)

  return /^[0-9]{6}$/.test(number)
}
