const validPrefixes = [
  'AA', 'AB', 'AC', 'AE', 'AG', 'AH', 'AJ', 'AK', 'AL', 'AM',
  'AN', 'AP', 'AR', 'AS', 'AT', 'AW', 'AX', 'AY', 'AZ', 'BA',
  'BB', 'BC', 'BE', 'BH', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BP',
  'BR', 'BS', 'BT', 'BW', 'BX', 'BY', 'BZ', 'CA', 'CB', 'CC',
  'CE', 'CG', 'CH', 'CJ', 'CK', 'CL', 'CM', 'CN', 'CP', 'CR',
  'CS', 'CT', 'CW', 'CX', 'CY', 'CZ', 'EA', 'EB', 'EC', 'EE',
  'EG', 'EH', 'EJ', 'EK', 'EL', 'EM', 'EN', 'EP', 'ER', 'ES',
  'ET', 'EW', 'EX', 'EY', 'EZ', 'GA', 'GC', 'GE', 'GG', 'GH',
  'GJ', 'GK', 'GL', 'GM', 'GN', 'GP', 'GR', 'GS', 'GT', 'GW',
  'GX', 'GY', 'GZ', 'HA', 'HB', 'HC', 'HE', 'HG', 'HH', 'HJ',
  'HK', 'HL', 'HM', 'HN', 'HP', 'HR', 'HS', 'HT', 'HW', 'HX',
  'HY', 'HZ', 'JA', 'JB', 'JC', 'JE', 'JG', 'JH', 'JJ', 'JK',
  'JL', 'JM', 'JN', 'JP', 'JR', 'JS', 'JT', 'JW', 'JX', 'JY',
  'JZ', 'KA', 'KB', 'KC', 'KE', 'KG', 'KH', 'KJ', 'KK', 'KL',
  'KM', 'KP', 'KR', 'KS', 'KT', 'KW', 'KX', 'KY', 'KZ', 'LA',
  'LB', 'LC', 'LE', 'LG', 'LH', 'LJ', 'LK', 'LL', 'LM', 'LN',
  'LP', 'LR', 'LS', 'LT', 'LW', 'LX', 'LY', 'LZ', 'MA', 'MB',
  'MC', 'ME', 'MG', 'MH', 'MJ', 'MK', 'ML', 'MM', 'MN', 'MP',
  'MR', 'MS', 'MT', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NB', 'NC',
  'NE', 'NG', 'NH', 'NJ', 'NL', 'NM', 'NN', 'NP', 'NR', 'NS',
  'NW', 'NX', 'NY', 'NZ', 'OA', 'OB', 'OC', 'OE', 'OG', 'OH',
  'OJ', 'OK', 'OL', 'OM', 'ON', 'OP', 'OR', 'OS', 'OT', 'OW',
  'OX', 'OY', 'OZ', 'PA', 'PB', 'PC', 'PE', 'PG', 'PH', 'PJ',
  'PK', 'PL', 'PM', 'PN', 'PP', 'PR', 'PS', 'PT', 'PW', 'PX',
  'PY', 'PZ', 'RA', 'RB', 'RC', 'RE', 'RG', 'RH', 'RJ', 'RK',
  'RL', 'RM', 'RN', 'RP', 'RR', 'RS', 'RT', 'RW', 'RX', 'RY',
  'RZ', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SJ', 'SK', 'SL',
  'SM', 'SN', 'SP', 'SR', 'SS', 'ST', 'SW', 'SX', 'SY', 'SZ',
  'TA', 'TB', 'TC', 'TE', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM',
  'TP', 'TR', 'TS', 'TT', 'TW', 'TX', 'TY', 'TZ', 'WA', 'WB',
  'WC', 'WE', 'WG', 'WH', 'WJ', 'WK', 'WL', 'WM', 'WN', 'WP',
  'WR', 'WS', 'WT', 'WW', 'WX', 'WY', 'WZ', 'XA', 'XB', 'XC',
  'XE', 'XG', 'XH', 'XJ', 'XK', 'XL', 'XM', 'XN', 'XP', 'XR',
  'XS', 'XT', 'XW', 'XX', 'XY', 'XZ', 'YA', 'YB', 'YC', 'YE',
  'YG', 'YH', 'YJ', 'YK', 'YL', 'YM', 'YN', 'YP', 'YR', 'YS',
  'YT', 'YW', 'YX', 'YY', 'YZ', 'ZA', 'ZB', 'ZC', 'ZE', 'ZG',
  'ZH', 'ZJ', 'ZK', 'ZL', 'ZM', 'ZN', 'ZP', 'ZR', 'ZS', 'ZT',
  'ZW', 'ZX', 'ZY'
]

const validSuffixes = ['A', 'B', 'C', 'D']

const getRandomValue = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const randomNumberBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min)

/**
 * Generates a random, valid UK National Insurance number
 * https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 * @returns string
 */
export const generateNiNumber = (): string => {
  const prefix = getRandomValue(validPrefixes)
  const suffix = getRandomValue(validSuffixes)

  // 000001 is a valid, so padding the start of the string with '0' includes 000001-099999
  const numbers = randomNumberBetween(0, 999999).toString().padStart(6, '0')

  return `${prefix}${numbers}${suffix}`
}
