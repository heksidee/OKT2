const BlogList = ({ blogs, handleLike, handleDelete }) => {
  return (
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog.id} className="blogrow">
          <td style={{ padding: "10px 20px", textAlign: "center" }}>{blog.author}</td>
          <td style={{ padding: "10px 20px", textAlign: "center" }}>{blog.title}</td>
          <td style={{ padding: "10px 20px", textAlign: "center" }}>{blog.url}</td>
          <td style={{ padding: "10px 20px", textAlign: "center" }}>
            <button onClick={() => handleLike(blog.id)}>Likes ({blog.likes})</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

export default BlogList;