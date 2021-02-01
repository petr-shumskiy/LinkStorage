export function trimUrl(url, char) {
  if (url.trimEnd().endsWith('/')) {
    return trimUrl(url.slice(0, url.length - 1))
  }
  return url
}
