const Filter = ({filterKey}) => {
    return (
        <div>
        filter shown with <input value={filterKey.value} onChange={filterKey.onChange}/>
        </div>
    )
}

export default Filter;