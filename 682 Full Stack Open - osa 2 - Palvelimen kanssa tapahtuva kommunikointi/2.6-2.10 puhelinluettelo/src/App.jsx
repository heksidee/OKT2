import { useState } from 'react'

const Filter = ({ newSearch, setNewSearch}) => (
  <div>
    Filter show with <input value={newSearch} onChange={(e) => setNewSearch(e.target.value)} />
  </div>
)

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, onSubmit}) => (
  <form onSubmit={onSubmit}>
      <div>
        Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
) 

const Numbers = ( {persons} ) => {
  return (
    <div>
      {persons.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1231244" },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") return;

    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName("");
      return;
    }
    setPersons([...persons, {name: newName, number: newNumber}]);
    setNewName("");
    setNewNumber("");
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} onSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons}/>
    </div>
  )

}

export default App