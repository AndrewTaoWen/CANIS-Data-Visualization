import { React, useState } from 'react'
import { MapContainer, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import CountryBox from './countryBox'
import "./WorldMap.css"
import outputData from '../data//output.json'; // Adjust the path as needed


const WorldMap = ({ countries, }) => {

    const [map, setMap] = useState(null);
    const [boxVisible, setBoxVisible] = useState(false);
    const [curCountry, setCurCountry] = useState(null);
    const [curUsers, setCurUsers] = useState([]);
    

    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    }

    const onEachCountry = (country, layer) => {
        const name = country.properties.ADMIN; 
        layer.options.fillColor = country.properties.color;
        layer.bindPopup(`${name}`);

        layer.on('click', () => {
            console.log(`clicked ${name}`)

            const selectedRegionUsers = Object.entries(outputData)
                .filter(([name, userDetails]) => userDetails["Region of Focus"] === country.properties.ADMIN)
                .map(([name, userDetails]) => ({ name, ...userDetails }));

            setCurUsers(selectedRegionUsers);
            setCurCountry(name);
            setBoxVisible(true);
        });
    }

    const handleClose = () => {
        window.location.reload();
    }

    return (
        <>
            <MapContainer
                style={{ height: "90vh" }}
                zoom={2}
                center={[20, 100]}
                whenCreated={setMap}>
                <GeoJSON
                    style={mapStyle}
                    data={countries}
                    onEachFeature={onEachCountry}
                />
            </MapContainer>
            <CountryBox isVisible={boxVisible} onClose={handleClose} name={curCountry} users={curUsers}/>
        </>
    );
}

export default WorldMap;