import { useState, useEffect } from 'react'
import axios from 'axios'

const FarmLocation = () => {
  const [geographical, setGeographical] = useState([])
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'
  const farmerId = '6642ef86c5f511a619f70b41'

  useEffect(() => {
    axios
      .get(`${API_URL}/api/geographical`)
      .then((res) => {
        setGeographical(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  return (
    <div>
      {geographical.map(
        (farm, index) =>
          farm.farmer.id === farmerId && (
            <div key={index}>
              <h2>Farm {index + 1}</h2>
              <p>Farm Location: {farm.farmLocation}</p>
              <p>Farm Area: {farm.farmArea}</p>
              <p>Farm Category: {farm.farmCategory}</p>
              <h2>Farmer</h2>
              <p>
                Name: {farm.farmer.firstname} {farm.farmer.middlename}.{' '}
                {farm.farmer.lastname}
              </p>
              <p>
                Birthdate:{' '}
                {new Date(farm.farmer.birthdate).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p>Gender: {farm.farmer.gender}</p>
              <p>
                Location: {farm.farmer.sitio}, {farm.farmer.baranggay},{' '}
                {farm.farmer.municipality}
              </p>
              <p>Phone Number: {farm.farmer.phoneNumber}</p>
            </div>
          ),
      )}
    </div>
  )
}

export default FarmLocation
