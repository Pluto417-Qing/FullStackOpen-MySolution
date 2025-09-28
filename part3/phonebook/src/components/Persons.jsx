const Persons = ({persons}) => {
  console.log("In person", persons);
  
  return (
    <>{
        persons.map(person => (
            <div key={person.id || person.name}>
            <p>{person.name} {person.number}</p>
            </div>
        ))
    }</>
  )
}

export default Persons;