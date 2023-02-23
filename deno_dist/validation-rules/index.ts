import { isValidType } from './is-valid-type.ts'
import { isValidLength } from './is-valid-length.ts'
import { isValidPrefix } from './is-valid-prefix.ts'
import { isValidNumber } from './is-valid-number.ts'
import { isValidSuffix } from './is-valid-suffix.ts'

export const rules = {
  type: isValidType,
  length: isValidLength,
  prefix: isValidPrefix,
  number: isValidNumber,
  suffix: isValidSuffix
}
