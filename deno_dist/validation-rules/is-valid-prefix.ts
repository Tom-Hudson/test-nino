import { validPrefixes } from '../internal/data.ts'

const validPrefixesSet = new Set(validPrefixes)

export const isValidPrefix = (nino: string): boolean => {
  const prefix = nino.slice(0, 2)

  return validPrefixesSet.has(prefix)
}