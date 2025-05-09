import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Mostvotes = ( {votes, anecdote} ) => {
  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes)
  return (
    <div>
      <p>{anecdote[maxIndex]}</p>
      <p>Has {maxVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleRandomClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex);
  }

  const handleVotesClick = () => {
    setVotes(preVotes => {
      const newVotes = [...preVotes];
      newVotes[selected] += 1;
      return newVotes;
    })
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVotesClick}>Vote</button>
      <button onClick={handleRandomClick}>Random anecdote</button>
      <Header text="Anecdote with most votes"/>
      <Mostvotes anecdote={anecdotes} votes={votes}/>
    </div>
  )
}

export default App