import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, InfoWindowF } from "@react-google-maps/api";
import GoogleApiLoad from "../GoogleApiLoad";
import { aEvent, Coord } from "../../types/Types";
import "../../assets/css/map.css";

function Map() {
  const { state } = useLocation();
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    setCoordinates(() => {
      console.log(state.payload);
      return state.payload.map((item: aEvent) => {
        return {
          label: item.headline,
          lat: item.metaData[0].location[0].latitude,
          lng: item.metaData[0].location[0].longitude,
        };
      });
    });
  }, []);

  return GoogleApiLoad() ? (
    <>
      <GoogleMap
        mapContainerClassName="map-container"
        center={{ lat: 34.0648099, lng: -118.2940402 }}
        zoom={10}
      >
        {coordinates.map((coord: Coord) => {
          return (
            <InfoWindowF key={coord.lat + coord.lng} position={coord}>
              <div className="info-window">{coord.label}</div>
            </InfoWindowF>
          );
        })}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
export default React.memo(Map);
