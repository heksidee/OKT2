import BlogList from "./components/Blog"
import { useState, useEffect } from "react"
import "./App.css";
import blogService from "./services/blogs"
import Notification from "./components/Notification"

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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        console.log("Fetched blogs:", initialBlogs)
        setBlogs(initialBlogs)
      })
      .catch(error => {
        console.error("Virhe blogien haussa:", error);
      });
  }, [])

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor("")
        setNewTitle("")
        setNewUrl("")
      })
  }

  const handleLike = (id) => {
    const blogToUpdate = blogs.find(blog => blog.id === id);
    const updatedBlog = { ...blogToUpdate, likes: (blogToUpdate.likes || 0) + 1};

    blogService
      .update(id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog));
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`The blog ${blogToUpdate.title} was already deleted`)
        setBlogs(blogs.filter(n => n.id !== id))

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={errorMessage}/>
    </div>
  )
}

export default App
