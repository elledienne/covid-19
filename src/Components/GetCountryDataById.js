import React, {useEffect, useState} from 'react';
import axios from "axios";

function GetCountryDataById(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalCaseOfCountry, setTotalCaseOfCountry] = useState(0);

  const fetchCountryDetail = (countryId) => {
    axios.get(`https://api.covid19api.com/total/dayone/country/${countryId}/status/confirmed`)
      .then(
        (res) => {
          setIsLoaded(true);
          if (res.data.length >= 2) {
            let status = "🔀";
            if (res.data[res.data.length-2].Cases > res.data[res.data.length-1].Cases) {
              status = "⬆️"
            } else if (res.data[res.data.length-2].Cases < res.data[res.data.length-1].Cases) {
              status = "⬇️"
            }
            setTotalCaseOfCountry(`${res.data[res.data.length-1].Cases} ${status}`);
          } else {
            setTotalCaseOfCountry(res.data[res.data.length-1].Cases);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };

  useEffect(() => {
    fetchCountryDetail(props.currentCountryData);
  }, [props.currentCountryData]);

  if (error && props.currentCountryData) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Fetching...</div>;
  } else {
    return (
      <h1 className={'total-case'}>
        Total Case: <strong>{totalCaseOfCountry}</strong>
      </h1>
    );
  }

}

export default GetCountryDataById;
