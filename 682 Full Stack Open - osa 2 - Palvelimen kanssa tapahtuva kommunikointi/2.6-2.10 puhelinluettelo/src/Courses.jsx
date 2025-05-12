const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
};

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={part.id} part={part} index={index}/>
      ))}
      
    </div>
  );
};

const Course = ( {course} ) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts}/>
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  );
};

const Courses = ( {courses} ) => {
  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course}/>
      ))}
    </div>
  );
};

export default Courses