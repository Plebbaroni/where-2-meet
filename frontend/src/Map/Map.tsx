import {APIProvider, Map} from '@vis.gl/react-google-maps';
// import * as dotenv from 'dotenv'

// dotenv.config()

function MapElement() {
  if (
    import.meta.env.VITE_GOOGLE_MAPS_KEY === undefined ||
    import.meta.env.VITE_GOOGLE_MAPS_KEY === ""
  ) {
    console.log("NO GOOGLE KEY");
    process.exit(1);
  }

  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  return (
    <APIProvider apiKey={key}>
      <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: -33.8811, lng: 151.1087}}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  )
};

export default MapElement;