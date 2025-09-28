import { useState } from 'react'

const Person = ({persons}) => {
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [formData, setFormData] = useState({
    newName: '',
    newNumber: '',
    filterKey: ''
  })

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === formData.newName)){
      alert(`${formData.newName} is already added to phonebook`)
      setFormData((prev) => ({
        ...prev,
        newName: ""
      }))
      return 
    }
    setPersons(persons.concat([{name: formData.newName, number: formData.newNumber}]))
    console.log("persons", persons)
    setFormData((prev) => ({
      ...prev,
      newName: "",
      newNumber: ""
    }))
  }

  const filteredPersons = formData.filterKey 
    ? persons.filter(person => 
        person.name.toLowerCase().includes(formData.filterKey.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={formData.filterKey} onChange={handleChange("filterKey")}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={formData.newName} onChange={handleChange("newName")}/>
        </div>
        <div>
          number: <input value={formData.newNumber} onChange={handleChange("newNumber")}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Person persons={filteredPersons}/>
    </div>
  )
}

export default App