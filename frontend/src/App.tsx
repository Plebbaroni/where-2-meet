import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import MapElement from './Map/Map'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar profileImage={reactLogo}></Sidebar>
      <MapElement></MapElement>
    </>
  )
}

export default App
