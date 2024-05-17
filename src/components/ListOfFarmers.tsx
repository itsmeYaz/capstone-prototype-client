import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

const ListOfFarmers = () => {
  const [farmersId, setFarmersId] = useState([])
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'
  useEffect(() => {
    axios
      .get(`${API_URL}/api/farmers`)
      .then((res) => {
        console.log(res.data)
        setFarmersId(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])
  return (
    <div>
      <h2>List of Farmers</h2>
      <ul>
        {farmersId.map((farmer) => (
          <Link to={`/farmer/${farmer.id}`}>
            <li className="flex cursor-pointer mb-2">
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
