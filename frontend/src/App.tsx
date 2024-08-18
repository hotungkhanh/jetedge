import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(()=> {
    console.log(import.meta.env.VITE_API_URL)
  }, [])

  return (
    <>
      <h2>Hallo World</h2>
      <p>Check console for API link to backend :)</p>
    </>
  )
}

export default App
