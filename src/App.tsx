import { useState } from 'react'
import './App.css'
import RegistroUsuario from './RegisterForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegistroUsuario/>
    </>
  )
}

export default App
