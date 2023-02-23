import { validSuffixes } from '../internal/data.ts'

const validSuffixesSet = new Set(validSuffixes)

export const isValidSuffix = (nino: string): boolean => {
  const suffix = nino[8]

  return validSuffixesSet.has(suffix)
}
