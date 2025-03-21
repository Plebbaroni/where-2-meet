import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './Sidebar/Sidebar'
import MapElement from './Map/Map'
import Recommendations from './Recommendations/Recommendations'

function App() {
  const [inputForms, setInputForms] = useState([
    { location: "", transportationType: "public_transport", maxTravelTime: 0, idx: 0 },
  ]);
  const [mapData, setMapData] = useState({
    places: [],
    intersection: []
  });

  const addInputBlock = () => {
    setInputForms([
      ...inputForms,
      { location: "", transportationType: "public_transport", maxTravelTime: 0, idx: inputForms.length },
    ]);
  };

  const updateInputBlock = (index: number, field: string, value: unknown) => {
    setInputForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, [field]: value } : form
      )
    );
  };

  const handleFormSubmit = async (inputForms: unknown) => {
    console.log("Form Data Submitted:", inputForms);

    try {
      const response = await fetch("http://localhost:5180/backend/intersections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input: inputForms}), // Send inputForms as JSON
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMapData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log(inputForms);
  }, [inputForms])

  return (
    <>
    <Sidebar
        inputForms={inputForms}
        addInputBlock={addInputBlock}
        updateInputBlock={updateInputBlock}
        onSubmit={handleFormSubmit}
      />
      <Recommendations places={mapData.places} />
      <MapElement
        places={mapData.places}
        isochrones={mapData.intersection}
      ></MapElement>
    </>
  );
}

export default App
