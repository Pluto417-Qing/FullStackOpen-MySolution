const PersonForm = ({name, number, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input value={name.value} onChange={name.onChange}/>
            </div>
            <div>
            number: <input value={number.value} onChange={number.onChange}/>
            </div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm;