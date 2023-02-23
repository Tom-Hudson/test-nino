import { validPrefixes } from '../internal/data'

const validPrefixesSet = new Set(validPrefixes)

export const isValidPrefix = (nino): boolean => {
  const prefix = nino.slice(0, 2)

  return validPrefixesSet.has(prefix)
}
