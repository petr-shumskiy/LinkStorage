export const wait = (millisec) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), millisec))
}
