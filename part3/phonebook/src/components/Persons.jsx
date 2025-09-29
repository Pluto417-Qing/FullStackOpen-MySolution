import Person from "./Person";

const Persons = ({persons, onDelete}) => {
  console.log("In person", persons);
  
  return (
    <>{
        persons.map(person => (
            <Person key={person.id} person={person} onDelete={onDelete} />
        ))
    }</>
  )
}

export default Persons;