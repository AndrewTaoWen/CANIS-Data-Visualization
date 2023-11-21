import React from 'react'
import { MapContainer, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "./WorldMap.css"

const WorldMap = ({ countries, }) => {

    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    }

    const onEachCountry = (country, layer) => {
        const name = country.properties.ADMIN; // Adjust based on your GeoJSON
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${name}`);
    }

    return (
        <MapContainer style={{ height: "90vh" }} zoom={2} center={[20, 100]}>
            <GeoJSON
                style={mapStyle}
                data={countries}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
    );
}

export default WorldMap;