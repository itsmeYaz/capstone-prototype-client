import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

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
    return <p>Getting farmers...</p>
  }
  return (
    <div>
      <h2>List of Farmers</h2>
      <ul>
        {farmersId.map((farmer) => (
          <Link to={`/farmer/${farmer.id}`}>
            <li className="flex mb-2 cursor-pointer">
              <User />
              {farmer.firstname} {farmer.lastname}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default ListOfFarmers
