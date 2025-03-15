import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';
import {Isochrone, Polygon} from '../Polygon/Polygon.tsx'

type MapProps = {
  places?: Place[];
  isochrones?: Isochrone[];
}

function MapElement(props: MapProps) {
  if (
    import.meta.env.VITE_GOOGLE_MAPS_KEY === undefined ||
    import.meta.env.VITE_GOOGLE_MAPS_KEY === ""
  ) {
    console.log("NO GOOGLE KEY");
    process.exit(1);
  }

  const colours = [
    "red",
    "yellow",
    "lime",
    "green",
    "aqua",
    "blue",
    "fuchsia",
    "navy",
  ];

  const key = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  return (
    <APIProvider apiKey={key}>
      <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: -33.8811, lng: 151.1087}}
        defaultZoom={12}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'164b9a393796fa80'}
      >
        {props.places && <Markers points={props.places}/>}
        {props.isochrones && props.isochrones.map((x, j) => {
          let colour = colours[j % colours.length];
          const re = new RegExp("intersection");
          if (re.test(x.search_id)) {
            colour = "black"
          }
          return x.shapes.map((y, i) => {
            return <Polygon
              paths={y.shell}
              strokeColor={`${colour}`}
              fillColor={`${colour}`}
              key={i}
              strokeWeight={colour === "black" ? 2 : 1}
            >

            </Polygon>
          })
        })}
      </Map>
    </APIProvider>
  )
};

interface Location {
  latitude: number;
  longitude: number;
};

interface DisplayName {
  text: string;
  languageCode: string;
};

export interface Place {
  location: Location;
  displayName: DisplayName;
  primaryType: String;
};

export interface GooglePlaces {
  places: Place[];
}

type MarkersProps = { 
  points: Place[] 
};

const Markers = ({ points }: MarkersProps) => {
  return <>
    {points.map(x => <AdvancedMarker
      position={ { lat: x.location.latitude, lng: x.location.longitude } }
      key={x.displayName.text}
    >
    
    </AdvancedMarker>)}
  </>;
}

export default MapElement;