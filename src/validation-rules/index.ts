import { isValidType } from './is-valid-type'
import { isValidLength } from './is-valid-length'
import { isValidPrefix } from './is-valid-prefix'
import { isValidNumber } from './is-valid-number'
import { isValidSuffix } from './is-valid-suffix'

export const rules = {
  type: isValidType,
  length: isValidLength,
  prefix: isValidPrefix,
  number: isValidNumber,
  suffix: isValidSuffix
}
