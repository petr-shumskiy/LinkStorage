export const wait = (millisec, cb) => {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), millisec))
}
