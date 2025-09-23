import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../requests"
import { useContext } from 'react'
import { NotificationContext } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      dispatch({ type: "SET", payload: `anecdote "${newAnecdote.content}" added`})
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content, votes: 0},
      {
      onError: (error) => {
        dispatch({ type: "SET", payload: error.response.data.error })
        setTimeout(() => {
          dispatch({ type: "CLEAR" })
        }, 5000)
      }
    }
  )
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
