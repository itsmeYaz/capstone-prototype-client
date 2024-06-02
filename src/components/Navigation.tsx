import { Link } from 'react-router-dom'
import { Shield, User } from 'lucide-react'
import logo from '/crops.svg' // Replace with the path to your logo

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-800 bg-opacity-75 backdrop-filter backdrop-blur-2xl backdrop-brightness-75 font-poppins">
      <div className="relative flex items-center justify-center px-4 py-4 mx-auto text-white md:px-0">
        <div className="absolute flex items-center left-4 md:left-10">
          <img src={logo} alt="Logo" className="w-auto h-10" />
          <Link to="/">
            <span className="ml-2 text-lg font-bold text-white">GrowSmart</span>
          </Link>
        </div>
        <Link
          to={`/farmer`}
          className="flex items-center px-2 py-1 space-x-2 transition-colors duration-200 rounded hover:bg-gray-700 hover:text-white"
        >
          <User />
          <span>Farmer</span>
        </Link>
        <Link
          to={`/admin`}
          className="flex items-center px-2 py-1 space-x-2 transition-colors duration-200 rounded hover:bg-gray-700 hover:text-white"
        >
          <Shield />
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
