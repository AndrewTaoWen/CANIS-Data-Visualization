import React, { useState, useEffect, useContext } from 'react';
import './WorldMap.css';

const CountryBox = ({ isVisible, onClose, name, users }) => {


    const maxIndex = users.length - 1;

    const [curIndex, setCurIndex] = useState(0);
    const [curProfile, setCurProfile] = useState(users[0]);
    const [countryInfo, setCountryInfo] = useState({
        capital: '',
        population: '',
        languages: [],
        currency: ''
    });


    const handleNext = () => {
        setCurIndex((prev) => {
            let nextIndex = prev + 1;
            if (nextIndex > maxIndex) {
                nextIndex = 0;
            }
            return nextIndex;
        })
    }

    const handlePrev = () => {
        setCurIndex((prev) => {
            let prevIndex = prev - 1;
            if (prevIndex - 1 < 0) {
                prevIndex = maxIndex;
            }
            return prevIndex;
        })
    }

    useEffect(() => {
        setCurProfile(users[curIndex]);
        console.log(curProfile)
    }, [curIndex])

    useEffect(() => {
        const fetchCountryInfo = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
            const data = await response.json();
            if (data[0]) {
                setCountryInfo({
                    capital: data[0].capital ? data[0].capital[0] : 'N/A',
                    population: data[0].population.toLocaleString(),
                    languages: Object.values(data[0].languages).join(', '),
                    currency: Object.values(data[0].currencies)[0].name
                });
            }
        };

        if (name) {
            fetchCountryInfo();
        }
    }, [name]);

    if (!isVisible) return null;

    console.log(users)
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="country-box" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <div className="box-left">
                    <h2 className="country-name">{name}</h2>
                    <p className="country-info">Capital: <span className="capital">{countryInfo.capital}</span></p>
                    <p className="country-info">Population: <span className="population">{countryInfo.population}</span></p>
                    <p className="country-info">Language: <span className="language">{countryInfo.languages}</span></p>
                    <p className="country-info">Currency: <span className="currency">{countryInfo.currency}</span></p>
                </div>

                <div className="box-right">
                    <h1>Accounts/Profiles</h1>
                    <button className="next-button" onClick={handleNext}>Next →</button>
                    <button className="previous-button" onClick={handlePrev}>← Previous</button>
                    {Object.entries(users[curIndex]).map(([key, value]) => {
                        if (value !== "None") {
                            return (
                                <p key={key}>
                                    {key.toLowerCase().includes('instagram') && <i className="fa-brands fa-instagram"></i>}
                                    {key.toLowerCase().includes('youtube') && <i className="fa-brands fa-youtube"></i>}
                                    {key.toLowerCase().includes('twitter') && <i className="fa-brands fa-twitter"></i>}
                                    {key.toLowerCase().includes('tiktok') && <i className="fa-brands fa-tiktok"></i>}
                                    {key.toLowerCase().includes('threads') && <i className="fa-brands fa-threads"></i>}
                                    {key.toLowerCase().includes('facebook') && <i className="fa-brands fa-facebook"></i>}
                                    <strong>{key}</strong>: {value}
                                </p>
                            );
                        } else {
                            return null; // Don't render anything if the value is "None"
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default CountryBox;
