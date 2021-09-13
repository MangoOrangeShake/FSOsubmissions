import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App

const Header = (props) => {
  console.log(props)
  return(
    <>
     <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.parts.parts[0].name} exercises={props.parts.parts[0].exercises} />
      <Part part={props.parts.parts[1].name} exercises={props.parts.parts[1].exercises} />
      <Part part={props.parts.parts[2].name} exercises={props.parts.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return(
    <>
      <p>Number of exercises {props.parts.parts[0].exercises + 
        props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
    </>
  )
}

/* STEPS (for docu)

NOTE: Review object syntax. Main initial mistake here was trying to assign an index to 'course', when
  'course' is NOT an array. It contains an array, but it itself is not an array.

1. Change const definitions into the provided code.
2. Change props definitions accordingly.
3. Adjust all props that call individual elements from the new object 'course'.

*/