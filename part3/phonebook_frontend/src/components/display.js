import React from 'react';

const Person = ({ person, deleteHandler }) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={deleteHandler}>delete</button>
        </p>
    )
}

const Persons = ({ persons, search, deletePerson }) => {

    const personsToShow = search //if there is nothing in the search field (empty string = FALSE), display default persons
        ? persons.filter(person =>
            person.name.toLowerCase().search(search.toLowerCase()) !== -1) //.search(x) returns -1 if no match
        : persons

    return (
        <div>
            {personsToShow.map(person =>
                <Person
                    key={person.id}
                    person={person}
                    deleteHandler={() => deletePerson(person.id, person.name)} />
            )}
        </div>
    )
}

const Notif = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    else {
        if (isError) {
            return (
                <div className='error'>
                    {message}
                </div>
            )
        }
        return (
            <div className='success'>
                {message}
            </div>
        )
    }
}

export { Person, Persons, Notif }