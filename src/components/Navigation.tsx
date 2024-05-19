import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { UserCheck } from 'lucide-react'

const Navigation = () => {
  return (
    <nav className="flex">
      <Link to={`/`} className="flex mr-5">
        <Home />
        Home
      </Link>
      <Link to={`/analytics`} className="flex">
        <UserCheck />
        Admin View
      </Link>
    </nav>
  )
}

export default Navigation
