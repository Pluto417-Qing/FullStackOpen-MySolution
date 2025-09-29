import Country from "./Country";

const CountryList = ({countries}) => {
    return (
        <div>
        {
            countries.map(country => (
                <Country country={country} key={country.name.common}/>
            ))
        }
        </div>
    )
}

export default CountryList;