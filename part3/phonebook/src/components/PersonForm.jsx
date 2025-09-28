const PersonForm = ({name, number, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input {...name}/>
            </div>
            <div>
            number: <input {...number}/>
            </div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm;