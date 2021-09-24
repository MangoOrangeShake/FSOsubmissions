import React from 'react'

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Header = ({ course }) => {
    return(
      <>
      <h2>{course.name}</h2>
      </>
    )
  }
  
  const Content = ({ course }) => {
    return(
      <div>
        {course.parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({ course }) => {
  
    let total = course.parts.reduce((sum, part) => {
      sum += part.exercises
      return sum
    }, 0)
  
    return(
      <p>
      <b>total of {total} exercises</b>
      </p>
    )
  }
  
export default Course;