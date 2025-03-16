import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';

import type {Ref} from 'react';
import {GoogleMapsContext} from '@vis.gl/react-google-maps';
import { regionArray } from '../App';

export type PolygonProps = google.maps.PolygonOptions 
  // & PolygonEventProps;

export type PolygonRef = Ref<google.maps.Polygon | null>;

export interface Isochrone {
  search_id: string;
  shapes: Shape[];
  properties: {}
};

export interface Coord {
  lat: number;
  lng: number;
}

export interface Shape {
  shell: Coord[];
  holes: Coord[][];
};

function usePolygon(props: PolygonProps) {
  const polygon = useRef(new google.maps.Polygon({
    paths: props.paths,
    strokeColor: props.strokeColor,
    strokeWeight: 1,
    fillColor: props.fillColor,
    fillOpacity: 0.2,
})).current;

  const map = useContext(GoogleMapsContext)?.map;

  // create polygon instance and add to the map once the map is available
  useEffect(() => {
    if (!map) {
      if (map === undefined)
        console.error('<Polygon> has to be inside a Map component.');

      return;
    }

    polygon.setMap(map);

    return () => {
      polygon.setMap(null);
    };
  }, [map]);

  regionArray.push(polygon);
  polygon.setVisible(true);
  return polygon;
}

/**
 * Component to render a Google Maps Polygon on a map
 */
export const Polygon = forwardRef((props: PolygonProps, ref: PolygonRef) => {
  const polygon = usePolygon(props);

  useImperativeHandle(ref, () => polygon);

  return null;
});
