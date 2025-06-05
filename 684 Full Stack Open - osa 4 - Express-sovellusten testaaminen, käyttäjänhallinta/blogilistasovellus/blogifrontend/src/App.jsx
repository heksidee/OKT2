import BlogList from "./components/Blog"
import { useState } from "react"

const Blogintiedot = ({ addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div style={{ paddingBottom: "7px" }}>
        <input style={{ marginRight: "3px"}} type="text" placeholder="Kirjoittaja" />
        <input style={{ marginRight: "3px"}} type="text" placeholder="Aihe" />
        <input type="text" placeholder="url" />
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

const App = (props) => {

  const [blogs, setBlogs] = useState(props.blogs)

  const addBlog = (event) => {
    event.preventDefault();
    const newId = blogs.length + 1;

    const newBlog = {
      id: newId,
      author: event.target[0].value,
      title: event.target[1].value,
      url: event.target[2].value
    };
    setBlogs(blogs.concat(newBlog));
  }
  
  return (
    <div>
      <h1>Blogisovellus</h1>
      <Blogintiedot addBlog={addBlog}/>
      <table>
        <TableHeader />
        <BlogList blogs={blogs}/>
      </table>
    </div>
  )
}

export default App
