/**
 * Normalises NINOs which have formatting in them
 * e.g. `AA 00 00 00 A` will be returned as `AA000000A`
 * @param nino
 * @returns string
 */
export const normalise = (nino: string): string => nino.replace(/ |\t/g, '').toUpperCase()
