import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(()=> {
    console.log(import.meta.env.VITE_API_URL)
  }, [])

  return (
    <>
    </>
  )
}

export default App
