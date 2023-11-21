import countriesData from "../data/countries.json";

class LoadCountriesTask {
    
    ad = aggregateData(countries);
    nd = normalizeData(aggregatedData);

    load = (setState) => {
        setState(countriesData.features);
    }

    #setCountryColor = (country) => {
        const legendItem = legendItems.find((item) =>
            item.isFor(country.properties.confirmed)
        );

        if (legendItem != null) country.properties.color = legendItem.color;
    };
}

export default LoadCountriesTask;