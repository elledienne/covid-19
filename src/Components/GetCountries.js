import React, { useState, useEffect } from "react";
import axios from "axios";
import GetCountryDataById from "./GetCountryDataById";

function GetCountries(props) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchCountries = () => {
    axios.get("https://api.covid19api.com/countries")
      .then(
        (res) => {
          setIsLoaded(true);
          setItems(res.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let selectedLabel, selectedComponent;
    if (selectedCountry) {
      selectedLabel = <div className={'current-country'}>Current Country:&nbsp;<strong> {selectedCountry}</strong></div>;
      selectedComponent = <GetCountryDataById currentCountryData={selectedCountry} />;
    }
    return (
      <div>
        <div className={'pick-country'}>
          <select onChange={(event) => setSelectedCountry(event.target.value)}>
            {items.map(item => (
              <option key={item.ISO2} value={item.Slug}>
                {item.Country}
              </option>
            ))}
          </select>
        </div>
        <div className={'country-detail'}>
          {selectedLabel}
          {selectedComponent}
        </div>
      </div>
    );
  }
}
export default GetCountries;
