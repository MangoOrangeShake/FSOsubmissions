import React from 'react'

const Input = ({ text, value, eventHandler }) => {
    return (
        <div>
            {text} <input value={value} onChange={eventHandler} />
        </div>
    )
}

const PersonForm = ({ submitHandler, nameValue, nameHandler, numberValue, numberHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <Input text='name:' value={nameValue} eventHandler={nameHandler} />
            <Input text='number:' value={numberValue} eventHandler={numberHandler} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export { Input, PersonForm }