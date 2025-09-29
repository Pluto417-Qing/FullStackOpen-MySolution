const Person = ({person, onDelete}) => {
    const handlePersonDelete = () => {
        onDelete?.(person)
    }

    return (
        <div key={person.id || person.name}>
            <p>{person.name} {person.number} <button onClick={handlePersonDelete}>delete</button></p>
        </div>
    )
}

export default Person;