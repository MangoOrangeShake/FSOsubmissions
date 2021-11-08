import React, { useState, useEffect } from 'react'
import personServices from './services/persons'
import { Persons, Notif } from './components/display'
import { Input, PersonForm } from './components/formsAndInput'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notif, setNotif] = useState(null)
  const [isError, setIsError] = useState(true)

  const fetchPersons = () => {
    personServices  // GET REQUEST
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(fetchPersons, [])

  const addPerson = (event) => { // event handler for submitting form
    event.preventDefault()

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    const existingPerson = persons.find(person =>
      person.name.toLowerCase().trim() === personObject.name.toLowerCase().trim())

    if (existingPerson) {

      if (existingPerson.number !== newNumber) {
        const changedPerson = { ...existingPerson, number: newNumber }

        if (window.confirm(`${changedPerson.name} is already added to the phonebook. Replace the old number with a new one?`)) {
          personServices
            .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {
              setNotif(`Successfully replaced ${returnedPerson.name}'s number.`)
              setIsError(false)
              setTimeout(() => { setNotif(null) }, 5000)
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              if (error.response) { //if update validator error...
                const errorMessage = error.response.data.error
                setNotif(`${errorMessage}`)
                setIsError(true)
                setTimeout(() => setNotif(null), 10000)
              } else { //if updating a non-existing name...
                setNotif(`Info of ${changedPerson.name} has already been removed from the server.`)
                setIsError(true)
                setTimeout(() => { setNotif(null) }, 8000)
                setPersons(persons.filter(person => person.id !== changedPerson.id))
                setNewName('')
                setNewNumber('')
              }
            })
        }
      }

      else { //allow no input if both name and number are already on the list
        window.alert(`${newName} is already added to the phonebook.`)
      }
    }

    else { //if new person...
      if (personObject.name && personObject.number) {
        personServices
          .create(personObject) // POST REQUEST
          .then(returnedPerson => {
            setNotif(`Successfully added ${returnedPerson.name}.`)
            setIsError(false)
            setTimeout(() => { setNotif(null) }, 5000)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            const errorMessage = error.response.data.error
            setNotif(`${errorMessage}`)
            setIsError(true)
            setTimeout(() => setNotif(null), 10000)
          })
      } else { //if missing field input...
        setNotif('Missing name and/or number.')
        setIsError(true)
        setTimeout(() => { setNotif(null) }, 5000)
      }
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personServices
        .deleteInServer(id) //DELETE REQUEST
        .then(() => {
          setNotif(`Successfully deleted ${name}.`)
          setIsError(false)
          setTimeout(() => {
            setNotif(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handleSearch = (event) => { //event handler for search input
    setSearch(event.target.value)
    console.log(search);
  }

  const handleNameChange = (event) => { //event handler for name input
    setNewName(event.target.value)
    console.log(newName);
  }

  const handleNumberChange = (event) => { //event handler for number input
    setNewNumber(event.target.value)
    console.log(newNumber);
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notif message={notif} isError={isError} />

      <Input text='filter by name:' value={search} eventHandler={handleSearch} />

      <h2>add a new</h2>

      <PersonForm submitHandler={addPerson} nameValue={newName} nameHandler={handleNameChange}
        numberValue={newNumber} numberHandler={handleNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} search={search.trim()} deletePerson={deletePerson} />

    </div>
  )
}

export default App