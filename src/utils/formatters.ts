export function numberFormatter(number: string): string {
  const formattedNumber = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(number))

  return formattedNumber
}
