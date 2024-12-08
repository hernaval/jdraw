export const roundNumToName = (round: number) => {
  switch (round) {
    case 8:
      return 'Quart de final'
    case 4:
      return 'Demi final'
    case 2:
      return 'final'
    default:
      return `${round / 2}e de final`
  }
}
