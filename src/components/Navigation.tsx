import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const Navigation = () => {
  return (
    <nav>
      <Link to={`/`} className="flex">
        <Home />
        Home
      </Link>
    </nav>
  )
}

export default Navigation
