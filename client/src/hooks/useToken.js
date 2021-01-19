import { useState, useEffect } from 'react'

function getToken() {
  const token = localStorage.getItem('token')
  return token
}

export default function useToken() {
  const [token, setToken] = useState(getToken())

  useEffect(() => {
    function handleToken() {
      'console.log(event)'
      // setToken(getToken())
    }
    window.addEventListener('storage', handleToken)
    return window.addEventListener('storage', handleToken)
  }, [])

  return token
}
