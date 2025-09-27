import { useState } from 'react'

const Statistics = ({ good, bad, neutral }) => {
  let all = good + bad + neutral

  if (all) {
    return (
      <>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + bad + neutral} />
            <StatisticLine text="average" value={(good + bad + neutral) / 3} />
            <StatisticLine text="pisotive" value={good / (good + bad + neutral) * 100 + "%"} />
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button style={{ marginLeft: "10px" }} onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button text={"good"} onClick={() => setGood(good + 1)} />
        <Button text={"neutral"} onClick={() => setNeutral(neutral + 1)} />
        <Button text={"bad"} onClick={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App