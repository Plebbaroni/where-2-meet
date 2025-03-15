import { ReactNode, useState, ChangeEvent, useEffect, useRef } from "react";
import classes from "./AddressForm.module.css";
import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef
} from '@vis.gl/react-google-maps';

const API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_KEY;
;

// type TextInputProp = {
//   autofocus?: boolean;
//   className?: string;
//   icon?: ReactNode;
//   placeholder: string;
//   name: string;
//   onChange: React.Dispatch<React.SetStateAction<string>>;
//   error?: boolean;
//   noMargin?: boolean;
//   textarea?: boolean;
//   value?: string;
// };

// export function AddressForm(props: TextInputProp) {
//   // const [focus, setFocus] = useState(false);
//   // const onFocus = () => setFocus(true);
//   // const onBlur = () => setFocus(false);
//   const [selectedPlace, setSelectedPlace] =
//     useState<google.maps.places.PlaceResult | null>(null);
//   const [markerRef, marker] = useAdvancedMarkerRef();

//   function handleChange(
//     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) {
//     const value = event.target.value;
//     props.onChange(value);
//   }

//   return (
//     <APIProvider
//       apiKey={API_KEY}
//     ></APIProvider>
//     <div
//       className={`${props.className ? props.className : classes.container} ${props.error ? classes.error : ""}`}
//       style={{ marginBottom: props.noMargin ? "0" : "" }}
//     >
//       {props.textarea ? (
//         <textarea
//           rows={6}
//           name={props.name}
//           placeholder={props.placeholder}
//           className={classes.input}
//           onChange={handleChange}
//           autoFocus={props.autofocus}
//           value={props.value}
//         />
//       ) : (
//         <input
//           autoFocus={props.autofocus}
//           name={props.name}
//           placeholder={props.placeholder}
//           value={props.value}
//           className={classes.input}
//           onChange={handleChange}
//         />
//       )}
//       <div className={classes.icon}>{props.icon && props.icon}</div>
//     </div>
//   );
// }


// const App = () => {
//   const [selectedPlace, setSelectedPlace] =
//     useState<google.maps.places.PlaceResult | null>(null);
//   const [markerRef, marker] = useAdvancedMarkerRef();

//   return (
//     <APIProvider
//       apiKey={API_KEY}
//       solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>
//       <Map
//         mapId={'bf51a910020fa25a'}
//         defaultZoom={3}
//         defaultCenter={{ lat: 22.54992, lng: 0 }}
//         gestureHandling={'greedy'}
//         disableDefaultUI={true}
//       >
//         <AdvancedMarker ref={markerRef} position={null} />
//       </Map>
//       <MapControl position={ControlPosition.TOP}>
//         <div className="autocomplete-control">
//           <AddressForm onPlaceSelect={setSelectedPlace} />
//         </div>
//       </MapControl>
//     </APIProvider>
//   );
// };

interface AddressFormProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export function AddressForm({ onPlaceSelect }: AddressFormProps) {
  const [addressForm, setAddressForm] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setAddressForm(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!addressForm) return;

    addressForm.addListener('place_changed', () => {
      onPlaceSelect(addressForm.getPlace());
    });
  }, [onPlaceSelect, addressForm]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
};

// const root = createRoot(document.getElementById('app')!);
// root.render(<App />);

// export default App;