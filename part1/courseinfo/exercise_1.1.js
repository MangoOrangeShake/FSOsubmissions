import React from 'react'

const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <p>{props.part1} {props.exercises1}</p>
      <p>{props.part2} {props.exercises2}</p>
      <p>{props.part3} {props.exercises3}</p>
    </>
  )
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.sum}</p>
    </>
  )
}

const App = () => {
  const one= 10
  const two= 7
  const three= 14

  return (
    <div>
      <Header course="Half Stack application development" />
      <Content part1="Fundamentals of React" exercises1={one}
               part2="Using props to pass data" exercises2={two}
               part3="State of a component" exercises3={three} />
      <Total sum={one + two + three} />
    </div>
  )
}

export default App
