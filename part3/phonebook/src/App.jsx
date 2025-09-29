import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phonebookService from './services/phonebook.js';

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
    phonebookService.getPersons()
      .then(data => {
        console.log('get persons', data)
        setPersons(data)
      })
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = persons.find(person => person.name == name.value)
    if (person) {
      const confirmed = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if(!confirmed)return

      const newPerson = {...person, number: number.value}
      phonebookService
      .updatePerson(newPerson.id, newPerson)
      .then(data => {
        const newPersons = persons.filter(person => person.id != newPerson.id)
        newPersons.push(data)
        setPersons(newPersons)
      })
      name.setValue("")
      number.setValue("")
      return 
    }
    phonebookService.addPerson({ name: name.value, number: number.value })
      .then(newPerson => {
        setPersons(prev => prev.concat(newPerson))
      })
    name.setValue("")
    number.setValue("")
  }

  const handleDelete = (person) => {
    const confirmed = window.confirm(`Delete ${person.name}?`)
    if (!confirmed) return

    phonebookService.deletePerson(person.id)
      .then(() => {
        setPersons(prev => prev.filter(p => p.id !== person.id))
      })
      .catch(error => {
        console.error('Failed to delete person', error)
      })
  }

  const filterValue = filterKey.value.trim().toLowerCase()
  const filteredPersons = filterValue
    ? persons.filter(person =>
        person.name.toLowerCase().includes(filterValue)
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterKey={filterKey}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} name={name} number={number}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App