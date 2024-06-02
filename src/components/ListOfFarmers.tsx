import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import Loading from './Loading'

const ListOfFarmers = () => {
  const [farmersId, setFarmersId] = useState([])
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/api/farmers`)
      .then((res) => {
        console.log(res.data)
        setFarmersId(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
      .finally(() => {
        setIsLoading(false) // Set loading to false when the fetch completes
      })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">
        Select Farmer
      </h2>
      <ul className="divide-y divide-gray-200">
        {farmersId.map((farmer) => (
          <Link
            to={`/farmer/${farmer.id}`}
            className="block py-4 transition-colors duration-200 hover:bg-gray-100"
          >
            <li className="flex items-center space-x-2">
              <User className="text-green-500" />
              <span className="text-lg font-medium text-gray-600">
                {farmer.firstname} {farmer.lastname}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default ListOfFarmers
