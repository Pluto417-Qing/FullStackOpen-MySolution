import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [filterKey, setFilterKey] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleFilterKeyChange = (e) => {
    setFilterKey(e.target.value)  
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filterKey)))  
  }

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all?fields=name,flags,capital,area,languages")
    .then(res => res.data)
    .then(data => {
      setCountries(data)
    })
  },[countries])

  return (
    <>
      <form>
        find countries <input value={filterKey} onChange={handleFilterKeyChange}/>
      </form>
      {
        filteredCountries.length > 10 ? 
          <p>Too many matches, specify another filter</p>:
          filteredCountries.length != 1 ?  
            <CountryList countries={filteredCountries} />
            : <Country country={filteredCountries[0]}/>
      }
    </>
  )
}

export default App
