const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h1>Languages</h1>
            <ul>
            {
                Object.values(country.languages).map((language, index) => {
                    return <li key={index}>{language}</li>
                })
            }
            </ul>
            <img src={country.flags.png}/>
        </div>
    )
}

export default Country;