import { useState, useEffect } from 'react'
import contactService from "./services/contacts"
import Notification from './components/Notification'
import Error from "./components/Error"


const Filter = ({ newSearch, setNewSearch}) => (
  <div>
    Filter show with <input value={newSearch} onChange={(e) => setNewSearch(e.target.value)} />
  </div>
)

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, onSubmit}) => (
  <form onSubmit={onSubmit}>
      <div className='newNumber'>
        Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div className='newNumber'>
        Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
) 

const Numbers = ( {persons, deleteContact} ) => {
  return (
    <div>
      {persons.map((person, index) => (
        <div key={person.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p key={index}>{person.name} {person.number}</p>
          <button onClick={() => deleteContact(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingContact = persons.find(person => person.name === newName)
    const newContact = {name: newName, number: newNumber}
    if (newName.trim() === "" || newNumber.trim() === "") return;
    console.log(newNumber.length)
    if (newName.length < 3) {
      setError("Name must be at least 3 characters long.");
      setTimeout(() => {
        setError(null)
      }, 4000)
      return;
    }

    if (newNumber.length < 8 || !/^\d{2,3}-\d{5,}$/.test(newNumber)) {
      setError("Phone number must be in format XX-XXXXX or XXX-XXXXXX and be at least 8 characters long.")
      setTimeout(() => {
        setError(null)
      }, 4000)
      return;
    }

    if (existingContact) {
      const confirmExisting = window.confirm(
        `"${newName}" is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmExisting) {
        contactService
          .update(existingContact.id, newContact)
          .then(updatedContact => {
            setPersons(persons.map(person =>
              person.id !== existingContact.id ? person : updatedContact.data
            ));
            setNewName("");
            setNewNumber("");
            setNotification(
              `${newName} number changed`
            )
            setTimeout(() => {
              setNotification(null)
            }, 4000)
          })
          .catch(error => {
            setNewName("");
            setNewNumber("");
            setPersons(persons.filter(p => p.name !== newName))
            setError(`${newName} was already deleted from to Phonebook`)
            setTimeout(() => {
              setError(null)
            }, 4000)
          })
      }
      return;
    }
    contactService
      .create(newContact)
      .then(response => {
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNumber("");
        setNotification(
          `${newName} added to Phonebook`
        )
        setTimeout(() => {
          setNotification(null)
        }, 4000)
      })
      .catch(error => {
        setError(error.response.data)
        setTimeout(() => {
          setError(null)
        }, 4000)
      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );

  const deleteContact = (id) => {
    const contactToDelete = persons.find(n => n.id === id)
    const confirm = window.confirm (`Do you really want to delete a contact "${contactToDelete.name}"?`)
    if (confirm) {
      contactService
        .remove(id)
        .then(responseData => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(
          `${contactToDelete.name} deleted from the Phonebook`
          )
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
        .catch(error => {
            setPersons(persons.filter(person => person.id !== id))
            setError(`${newName} was already deleted from to Phonebook`)
            setTimeout(() => {
              setError(null)
            }, 4000)
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} onSubmit={handleSubmit}/>
      <Notification message={notification}/>
      <Error message={error}/>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} deleteContact={deleteContact}/>
    </div>
  )

}

export default App