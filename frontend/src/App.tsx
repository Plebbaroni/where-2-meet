import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import MapElement from './Map/Map'
import InputBlock from './InputBlock/InputBlock'
import Recommendations from './Recommendations/Recommendations'
import data from '../../testData/places.ts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar></Sidebar>
      <Recommendations
        points={data.places}
      ></Recommendations>
      <MapElement></MapElement>
    </>
  )
}

export default App
