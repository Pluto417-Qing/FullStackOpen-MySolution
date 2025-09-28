const CountryList = ({countries}) => {
    return (
        <div>
        {
            countries.map(country => {
                <div>
                    <p>{country.name.common} <button>show</button></p>
                </div>
            })
        }
        </div>
    )
}

export default CountryList;