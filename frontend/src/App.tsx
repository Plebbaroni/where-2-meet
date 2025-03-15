import './App.css'
import Sidebar from './Sidebar/Sidebar'
import MapElement from './Map/Map'
import Recommendations from './Recommendations/Recommendations'
import data from '../../testData/places.ts';
import isochrone2 from '../../testData/isochrone2.ts';

function App() {
  return (
    <>
      <Sidebar></Sidebar>
      <Recommendations
        places={data.places}
      ></Recommendations>
      <MapElement
        places={data.places}
        isochrones={isochrone2.results}
      ></MapElement>
    </>
  )
}

export default App
