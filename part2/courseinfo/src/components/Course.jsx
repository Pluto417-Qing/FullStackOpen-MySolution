const Header = (props) => {
  return (
    <h3>{props.course}</h3>
  )
}

const Content = (props) => {
  return (
    <>
        {
            props.parts.map(part => <Part part={part} />)
        }
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <b>total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;