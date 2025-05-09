import { useState } from "react"

const Header = (props) => <h1>{props.text}</h1>

const Button = ( {handleClick, text} ) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statisticline = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const totalScore = good * 1 + neutral * 0 + bad * (-1); 
  const average = total === 0 ? 0 : totalScore / total;
  const positive = good / total * 100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statisticline text="Good" value={good}/>
        <Statisticline text="Neutral" value={neutral}/>
        <Statisticline text="Bad" value={bad}/>
        <Statisticline text="All" value={total}/>
        <Statisticline text="Average" value={average.toFixed(1)}/>
        <Statisticline text="Positive" value={positive.toFixed(1)}/>
      </tbody>
    </table>
  ) 
}

const App = () => {
  const[good, setGood] = useState(0)
  const[neutral, setNeutral] = useState(0)
  const[bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give feedback"/>
      <Button handleClick={() => setGood(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="Bad"/>
      <Header text="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App