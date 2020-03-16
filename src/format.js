export const formatCurrency = (raw, currency) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency,
  minimumIntegerDigits: 1,
  maximumFractionDigits: 2
}).format(raw)

export const formatTime = (totalSeconds) => {
  const years = Math.floor(totalSeconds / (60*60*24*365))
  const days = Math.floor(totalSeconds % (60*60*24*365) / (60*60*24))
  const hours = Math.floor((totalSeconds % (60*60*24)) / (60*60))
  const minutes = Math.floor((totalSeconds % (60*60)) / 60)
  const seconds = totalSeconds % 60

  return `${years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}` +
        `${days > 0 ? `${days} day${days > 1 ? 's' : ''} ` : ''}` +
        `${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''}` +
        `${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}` +
        `${seconds === 1 ? '1 second' : `${seconds} seconds`}`
}