'use client';

import { FC } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import DraggableMarker from './DraggableMarker';
import { Location } from '../../types';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center: Location;
  setMeetingPoint?: (location: Location) => void;
}

const Map: FC<MapProps> = ({ center, setMeetingPoint }) => {
  return (
    <>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="min-h-[35vh] z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {setMeetingPoint ? (
          <DraggableMarker center={center} setMeetingPoint={setMeetingPoint} />
        ) : (
          <Marker position={center} />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
