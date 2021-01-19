export const wrapUrl = (url) => {
  const domainPart = url.split('://')[1]
  if (domainPart.length > 32) {
    return domainPart.slice(0, 32) + '...'
  }
  return domainPart.slice(0, -1)
}
