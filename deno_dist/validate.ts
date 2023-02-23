import { rules } from './validation-rules/index.ts'

export interface ValidationRules {
  type?: boolean
  length?: boolean
  prefix?: boolean
  number?: boolean
  suffix?: boolean
}

interface ValidateResult {
  rules: ValidationRules
  outcome: boolean
}

/**
 * Validates UK National Insurance numbers in accordance with https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 * @param nino
 * @param config
 * @returns ValidateResult
 */
export const validate = (nino: string): ValidateResult => {
  const result: ValidateResult = { outcome: true, rules: {} }

  for (const key in rules) {
    const outcome: boolean = rules[key](nino)
    result.rules[key] = outcome

    if (result.outcome) {
      result.outcome = outcome
    }

    if (!outcome) {
      break
    }
  }

  return result
}
