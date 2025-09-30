const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error' style={{
        fontSize: "20px",
        color: "green"
    }}>
      {message}
    </div>
  )
}

export default Notification;