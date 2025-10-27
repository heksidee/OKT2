interface Headerprops {
  name: string;
}

interface TotalProps {
  total: number;
}

interface CourseParts {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: CourseParts[];
}

const Header = (props: Headerprops) => {
  return <h1>{props.name}</h1>;
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises: {props.total}</p>;
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.content.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
