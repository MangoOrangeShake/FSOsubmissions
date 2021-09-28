import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(search);
  }

  return (
    <div>
      <h1>data found in https://restcountries.com/v3.1/all</h1>
      <div>
        filter by country name<input value={search} onChange={handleSearch} />
      </div>
      <Display countries={countries} search={search} />
    </div>
  );
}

const Display = ({ countries, search }) => {

  const searchResults = search ? countries.filter(country =>
    country.name.common.toLowerCase().search(search.toLowerCase()) !== -1) : countries

  if (1 < searchResults.length && searchResults.length <= 10 && search) {
    return (
      <div>
        {searchResults.map((country, i) =>
          <p key={i}>{country.name.common}</p>)}
      </div>
    )
  }

  else if (searchResults.length > 10 && search) {
    return (
      <div>
        Too many matches, specify further.
      </div>
    )
  }

  else if (searchResults.length === 1 && search) {
    return (
      <div>
        {searchResults.map((country, i) =>
          <h2 key={i}>{country.name.common}</h2>)}
      </div>
    )
  }

  else if (!search) {
    return <div></div>
  }
}

export default App;
