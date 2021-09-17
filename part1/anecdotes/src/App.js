import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(7))

  const upVote = () => { //EventHandler: vote incrementer
    let newVotes = [...votes] //dont directly change the state
    newVotes[selected] += 1
    console.log(newVotes)
    setVotes(newVotes)
  }

  const randAnec = () => { //EventHandler: random anecdote generator
    let number
    do {
      number = Math.round(Math.random()*(anecdotes.length - 1))}
    while (number === selected); //so that state/index is not repeated (which leads to failure to re-render)
    console.log(number)
    setSelected(number)
  }

  const winner = () => { //find index of element with highest number
    for (let x = 0; x <= anecdotes.length - 1; x++) {
      if (votes[x] === Math.max(...votes)) {
        return x
      }
    }
    console.log(winner)
  }

  return (
    <div>
      <Display text1='Anecdote of the day' text2={anecdotes[selected]} text3={'has ' + votes[selected] + ' votes'} />
      <Button handleClick={upVote} text='vote'/>
      <Button handleClick={randAnec} text='next anecdote'/>
      <Display text1='Anecdote with most votes' text2={anecdotes[winner()]} text3={'has ' + votes[winner()] + ' votes'} />
    </div>
  )
}

const Display = ({text1, text2, text3}) => {
  return(
    <>
    <h2>{text1}</h2>
    {text2}
    <br></br>
    {text3}
    <br></br>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App

/* STEPS (for docu)

1. Create algorithm that determines which index in votes array has the element with the highest number.
2. Display final portion of the application.
3. Refactor. 
*/