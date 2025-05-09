/*const Total = ({course}) => {
  const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {totalExercises}</p>
}*/
const Course = ( {course} ) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course.parts}/>
    </div>
  );
};

const Header = ({course}) => {
  return <h1>{course.name}</h1>
};

const Content = ({course}) => {
  const total = course.reduce((sum, part) => sum + part.exercises, 0); 
  return (
    <div>
      {course.map((part, index) => (
        <Part key={index} part={part}/>
      ))}
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  );
};

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}
export default App