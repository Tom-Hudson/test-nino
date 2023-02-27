import { validNumbersObj, validPrefixesObj, validSuffixesObj } from './internal/data'

interface ValidateResult {
  reason?: string
  outcome: boolean
}

/**
 * Validates UK National Insurance numbers in accordance with https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 * @param nino
 * @returns ValidateResult
 */
export const validate = (nino: string): ValidateResult => {
  if (typeof nino !== 'string') {
    return {
      reason: 'type invalid',
      outcome: false
    }
  }

  if (nino.length !== 9) {
    return {
      reason: 'NINO must be 9 characters exactly',
      outcome: false
    }
  }

  if (validPrefixesObj[nino[0] + nino[1]] !== true) {
    return {
      reason: 'prefix invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[2]] !== true) {
    return {
      reason: '1st digit invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[3]] !== true) {
    return {
      reason: '2nd digit invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[4]] !== true) {
    return {
      reason: '3th digit invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[5]] !== true) {
    return {
      reason: '4th digit invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[6]] !== true) {
    return {
      reason: '5th digit invalid',
      outcome: false
    }
  }

  if (validNumbersObj[nino[7]] !== true) {
    return {
      reason: '6th digit invalid',
      outcome: false
    }
  }

  if (validSuffixesObj[nino[8]] !== true) {
    return {
      reason: 'suffix invalid',
      outcome: false
    }
  }

  return { outcome: true }
}
