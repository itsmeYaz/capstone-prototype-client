import loading from '../assets/square.gif'

function Loading() {
  return (
    <div className="flex justify-center py-5">
      <img src={loading} alt="Loading..." />
    </div>
  )
}

export default Loading
