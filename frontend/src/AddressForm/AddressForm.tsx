import { useState, useEffect, useRef } from "react";
import { useMapsLibrary, } from '@vis.gl/react-google-maps';

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
