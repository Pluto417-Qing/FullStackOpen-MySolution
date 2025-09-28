import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (e) => setValue(e.target.value)
    return { value, onChange, setValue }
  }

  const name = useInput('')
  const number = useInput('')
  const filterKey = useInput('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => res.data)
      .then(data => {
        setPersons(data)
      })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(persons.some(person => person.name === name.value)){
      alert(`${name.value} is already added to phonebook`)
      name.setValue("")
      return 
    }
    setPersons(persons.concat([{name: name.value, number: number.value}]))
    name.setValue("")
    number.setValue("")
  }

  const filteredPersons = filterKey 
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterKey.value.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterKey={filterKey}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} name={name} number={number}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App