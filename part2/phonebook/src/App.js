import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const fetchPersons = () => {
    console.log('useEffect effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data)
      })
  }

  useEffect(fetchPersons, [])

  console.log('rendering', persons.length, 'objects');

  const addName = (event) => { //event handler for submitting form
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length-1].id + 1
    }

    if (persons.filter(person => person.name === nameObject.name).length) 
        // length is 1 if there is an element in persons with the same name as nameObject
        {
          setPersons([...persons]) 
          window.alert(`${newName} is already added to the phonebook.`)
        }    

    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
      
      <Input text='filter by name:' value={search} eventHandler={handleSearch} />

      <h2>add a new</h2>

      <PersonForm submitHandler={addName} nameValue={newName} nameHandler={handleNameChange}
                    numberValue={newNumber} numberHandler={handleNumberChange} />
      
      <h2>Numbers</h2>

      <Persons persons={persons} search={search} />

    </div>
  )
}

const Person = ({ person }) => {
  return(
      <p>{person.name} {person.number}</p>
  )
}

const Persons = ({ persons, search }) => {
  
  const personsToShow = search //if there is no input (empty string = FALSE), display default persons
    ? persons.filter(person => 
        person.name.toLowerCase().search(search.toLowerCase()) !== -1 ) //.search(x) returns -1 if no match
    : persons

  return(
    <div>
      {personsToShow.map(person => 
        <Person key={person.id} person={person} />
        )}
    </div>
  )
}

const Input = ({ text, value, eventHandler }) => {
  return(
    <div>
    {text} <input value={value} onChange={eventHandler} />
    </div>
  )
}

const PersonForm = (props) => {
  return(
  <form onSubmit={props.submitHandler}>
    <Input text='name:' value={props.nameValue} eventHandler={props.nameHandler} />
    <Input text='number:' value={props.numberValue} eventHandler={props.numberHandler} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default App