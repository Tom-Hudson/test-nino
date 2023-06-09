import { validNumbersObj, validPrefixesObj, validSuffixesObj } from './internal/data'

export interface ValidateResult {
  rules?: {
    type?: boolean
    length?: boolean
    prefix?: boolean
    number?: boolean
    suffix?: boolean
  }
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
      rules: {
        type: false
      },
      outcome: false
    }
  }

  if (nino.length !== 9) {
    return {
      rules: {
        type: true,
        length: false
      },
      outcome: false
    }
  }

  if (validPrefixesObj[nino[0] + nino[1]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[2]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[3]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[4]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[5]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[6]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validNumbersObj[nino[7]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: false
      },
      outcome: false
    }
  }

  if (validSuffixesObj[nino[8]] !== true) {
    return {
      rules: {
        type: true,
        length: true,
        prefix: true,
        number: true,
        suffix: false
      },
      outcome: false
    }
  }

  return {
    rules: {
      type: true,
      length: true,
      prefix: true,
      number: true,
      suffix: true
    },
    outcome: true
  }
}
