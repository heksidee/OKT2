interface Headerprops {
  name: string;
}

interface TotalProps {
  total: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: CoursePart[];
}

const Header = (props: Headerprops) => {
  return <h1>{props.name}</h1>;
};

const Total = (props: TotalProps) => {
  return <h3>Number of exercises: {props.total}</h3>;
};

const Content = ({ content }: ContentProps) => (
  <div>
    {content.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
  }
};

interface PartProps {
  part: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescriptionPart {
  description: string;
}

interface CoursePartBasic extends CoursePartBase, DescriptionPart {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase, DescriptionPart {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase, DescriptionPart {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
