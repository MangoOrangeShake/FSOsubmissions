import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([
    {name:
      {common: 'Philippines'
      }},
    'wow'
  ])
  const [search, setSearch] = useState('')
  const [weatherData, setWeatherData] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  const fetchCountries = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(fetchCountries, [])

  const countriesToShow = search ? countries.filter(country =>
    country.name.common.toLowerCase().search(search.toLowerCase()) !== -1) : countries

  const fetchWeather = () =>
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countriesToShow[0].name.common}`)
      .then(response => {
        setWeatherData(response.data)
      })

  useEffect(fetchWeather, [api_key, countriesToShow])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(search);
  }

  const handleShowEvent = (index) => {
    setSearch(countriesToShow[index].name.common)
  }

  return (
    <div>
      <h3>data found in https://restcountries.com/v3.1/all</h3>
      <div>
        filter by country name: <input value={search} onChange={handleSearch} />
      </div>
      <Display
        countriesToShow={countriesToShow}
        search={search}
        showHandler={handleShowEvent}
        weatherData={weatherData}
      />
    </div>
  );
}

const Display = ({ countriesToShow, search, showHandler, weatherData }) => {

  console.log(countriesToShow);
  console.log(weatherData);

  if (1 < countriesToShow.length && countriesToShow.length <= 10 && search) {
    return (
      <div>
        {countriesToShow.map((country, i) =>
          <Country
            key={i}
            country={country}
            eventHandler={() => showHandler(i)}
          />
        )}
      </div>
    )
  }

  else if (countriesToShow.length > 10 && search) {
    return (
      <div>
        Too many matches, specify further.
      </div>
    )
  }

  else if (countriesToShow.length === 1) {
    const countryObject = countriesToShow[0]

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
        <h3>Weather in {countryObject.name.common}</h3>
        <p>temperature: {weatherData.current.temperature} degrees Celsius</p>
        <img
          src={weatherData.current.weather_icons[0]}
          alt={`weather visual for ${countryObject.name.common}`}
        />
        <p>wind: {weatherData.current.weather_descriptions.wind_speed} mph direction {weatherData.current.weather_descriptions.wind_dir}</p>
      </div>
    )
    
  }

  else if (countriesToShow.length === 0 && search) {
    return (
      <div>
        No countries found.
      </div>
    )
  }

  return (
    <div>
      Search field empty or data still being fetched.
    </div>
  )
}

const Country = ({ country, eventHandler }) => {
  return (
    <p>
      {country.name.common}
      <button onClick={eventHandler}>show</button>
    </p>
  )
}

const Language = ({ indivLang }) => {
  return (
    <li>{indivLang}</li>
  )
}

export default App;
