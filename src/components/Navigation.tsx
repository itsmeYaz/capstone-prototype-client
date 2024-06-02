import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { UserCheck } from 'lucide-react'

const Navigation = () => {
  return (
    <nav className="flex">
      <Link to={`/`} className="flex mr-5">
        <User />
        Farmer
      </Link>
      <Link to={`/admin`} className="flex">
        <UserCheck />
        Admin
      </Link>
    </nav>
  )
}

export default Navigation
