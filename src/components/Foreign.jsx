import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Legend from './Legend';
import WorldMap from './WorldMap';
import LoadCountriesTask from '../tasks/LoadCountriesTask'
import legendItems from "../entities/LegendItems";

const Foreign = () => {
    const [countries, setCountries] = useState([]);

    const legendItemsReverse = [...legendItems].reverse();

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load((countries) => setCountries(countries));
    }
    useEffect(load, []);

    return (
        <div>{countries.length === 0 ?
            <Loading /> :
            <div>
                <WorldMap countries={countries}/>
                <Legend legendItems={legendItemsReverse} />
            </div>}
        </div>
    );

}

export default Foreign;