'use client';

import { useMemo, useRef, useState, FC, useCallback, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Location } from '@/app/types';

interface DraggableMarkerProps {
  center: Location;
  setMeetingPoint?: (location: Location) => void;
}

const DraggableMarker: FC<DraggableMarkerProps> = ({
  center,
  setMeetingPoint,
}) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef<any | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          setPosition(marker.getLatLng());
          if (setMeetingPoint) {
            setMeetingPoint(marker.getLatLng());
          }
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable} className="cursor-pointer">
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;
