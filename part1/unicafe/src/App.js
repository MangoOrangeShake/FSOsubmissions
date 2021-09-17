import React, { useState } from 'react' //call capability to use Hooks

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Feedback = ({goodHandler, neutralHandler, badHandler}) => {
  return(
    <>
      <h2>give feedback</h2>
      <Button handleClick={goodHandler} text='good' />
      <Button handleClick={neutralHandler} text='neutral' />
      <Button handleClick={badHandler} text='bad' />
    </>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({clicks}) => {
  if (clicks.all === 0) {
    return(
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text='good' value={clicks.good}/>
          <StatisticsLine text='neutral' value={clicks.neutral}/>
          <StatisticsLine text='bad' value={clicks.bad}/>
          <StatisticsLine text='all' value={clicks.all}/>
          <StatisticsLine text='average' value={(clicks.average/clicks.all).toFixed(2)}/>
          <StatisticsLine text='positive' value={((clicks.positive/clicks.all)*100).toFixed(0) + '%'}/>
        </tbody>
      </table> 
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0
  })
  
  const setGood = () => 
    setClicks({...clicks, 
      good: clicks.good + 1, 
      all: clicks.all + 1, 
      average: clicks.average + 1, 
      positive: clicks.positive + 1})

  const setNeutral = () => 
    setClicks({...clicks, 
      neutral: clicks.neutral + 1, 
      all: clicks.all + 1})

  const setBad = () => 
    setClicks({...clicks, 
      bad: clicks.bad + 1, 
      all: clicks.all + 1, 
      average: clicks.average - 1})

  console.log(clicks)
  
  return (
    <div>
      <Feedback goodHandler={setGood} neutralHandler={setNeutral} badHandler={setBad} />
      <Statistics clicks={clicks} />
    </div>
  );
}

export default App;