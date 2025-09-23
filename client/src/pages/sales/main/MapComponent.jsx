import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapComponent() {
  const center = {
    lat: 28.4965352527687,
    lng: 77.16045185894953
  };

  return (
    <div className="ratio ratio-16x9">
      <LoadScript googleMapsApiKey="AIzaSyDSPdEeCFwq2SOvU3gtmad31bEfbTKtjko">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
