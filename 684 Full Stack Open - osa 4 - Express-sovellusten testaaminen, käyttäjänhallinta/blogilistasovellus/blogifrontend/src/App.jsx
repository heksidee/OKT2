import BlogList from "./components/Blog"
import { useState, useEffect } from "react"
import axios from "axios"
import "./App.css";

const Blogintiedot = ({ addBlog, newAuthor, newTitle, newUrl, handleAuthorChange, handleTitleChange, handleUrlChange }) => {
  return (
    <form onSubmit={addBlog}>
      <div className="bloginlisäys">
        <input value={newAuthor} type="text" placeholder="Author" onChange={handleAuthorChange} />
        <input value={newTitle} type="text" placeholder="Title" onChange={handleTitleChange} />
        <input value={newUrl} type="text" placeholder="url" onChange={handleUrlChange} />
      </div>
      <button>Lisää blogi</button>
    </form>
  )
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th style={{ padding: "10px 20px" }}>Author</th>
        <th style={{ padding: "10px 20px" }}>Title</th>
        <th style={{ padding: "10px 20px" }}>URL</th>
      </tr>
    </thead>
  )
}

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newAuthor, setNewAuthor] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    axios
    .get("http://localhost:3001/blogs")
    .then(response => {
      setBlogs(response.data)
    })
  }, [])

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: 0
    }

    axios
      .post("http://localhost:3001/blogs", blogObject)
      .then(response => {
        console.log(response);
        setBlogs(blogs.concat(response.data))
        setNewAuthor("")
        setNewTitle("")
        setNewUrl("")
      })
  }

  const handleLike = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: (blogToUpdate.likes || 0) + 1};

    axios
      .put(`http://localhost:3001/blogs/${id}`, updatedBlog)
      .then(response => {
        setBlogs(blogs.map(blog => blog.id === id ? response.data : blog));
      })
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  
  return (
    <div>
      <h1>Blogisovellus</h1>
      <Blogintiedot 
        addBlog={addBlog} 
        newAuthor={newAuthor} 
        newTitle={newTitle} 
        newUrl={newUrl}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange} />
      <table>
        <TableHeader />
        <BlogList blogs={blogs} handleLike={handleLike}/>
      </table>
    </div>
  )
}

export default App
