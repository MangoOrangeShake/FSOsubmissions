import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(search);
  }
  
  const handleShowEvent = (index) => {
    setSearch(countriesToShow[index].name.common)
  }

  const countriesToShow = search ? countries.filter(country =>
    country.name.common.toLowerCase().search(search.toLowerCase()) !== -1) : countries

  console.log(countriesToShow);

  return (
    <div>
      <h3>data found in https://restcountries.com/v3.1/all</h3>
      <Search search={search} eventHandler={handleSearch} />
      <Countries
        countriesToShow={countriesToShow}
        showHandler={handleShowEvent}
      />
    </div>
  );
}

const Search = ({ search, eventHandler }) => {
  return (
    <div>
      filter by country name: <input value={search} onChange={eventHandler} />
    </div>
  )
}

const Weather = ({ weatherData, city }) => {
  console.log(weatherData);
  if (!weatherData) {
    return null
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>temperature: {weatherData.current.temperature} degrees Celsius</p>
      <img
        src={weatherData.current.weather_icons[0]}
        alt={`weather visual for ${city}`}
      />
      <p>wind: {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
    </div>
  )
}

const Country = ({ countryObject }) => {

  const [weatherData, setWeatherData] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() =>
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryObject.capital[0]}`)
      .then(response => {
        console.log(response);
        setWeatherData(response.data)
      }), [])

  const lang = []
  for (const eachLang in countryObject.languages) {
    lang.push(countryObject.languages[eachLang]);
  }

  return (
    <div>
      <h2>{countryObject.name.common}</h2>
      <p>capital: {countryObject.capital[0]}</p>
      <p>area: {countryObject.area} square kilometers</p>
      <h3>languages</h3>
      <ul>
        {lang.map((n, i) =>
          <Language key={i} indivLang={n} />
        )}
      </ul>
      <img
        src={countryObject.flags.svg}
        alt={`flag of ${countryObject.name.common}`}
        height='150' />
      <Weather weatherData={weatherData} city={countryObject.capital[0]}/>
    </div>
  )
}

const Countries = ({ countriesToShow, showHandler }) => {
  
  if (countriesToShow.length === 0) {
    return (
      <div>
        No matches.
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    console.log(countriesToShow);
    return (
      <Country countryObject={countriesToShow[0]} />
    )
  }

  if (countriesToShow.length < 10) {
    return (
      <div>
        {countriesToShow.map((country, i) =>
          <p key={i}>
            {country.name.common}
            <button onClick={() => showHandler(i)}>show</button>
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

const Language = ({ indivLang }) => {
  return (
    <li>{indivLang}</li>
  )
}

export default App;
