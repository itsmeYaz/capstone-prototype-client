import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button.tsx'
import { Link, useParams } from 'react-router-dom'
import { User } from 'lucide-react'

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState({})
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'
  // const [id, setId] = useState('')

  const { id } = useParams()

  axios
    .get(`${API_URL}/api/farmers/${id}`)
    .then((res) => {
      setFarmer(res.data)
    })
    .catch((error) => {
      console.error('Error fetching data: ', error)
    })

  console.log(id)
  return (
    <>
      <h2 className="flex mb-6 justify-center">
        <User />
        {farmer.firstname}'s Profile
      </h2>
      <h5 className="mb-1 text-red-300">
        Note: This is the farmers POV when they view their profile
      </h5>
      <div className="grid grid-cols-2 gap-4">
        <p className="text-2xl">
          Farmer Name:
          <span className="text-green-500">
            {farmer.firstname} {farmer.middlename}. {farmer.lastname}
          </span>
        </p>
        <p className="text-2xl">
          Birthdate:
          <span className="text-green-500">
            {farmer.birthdate &&
              new Date(farmer.birthdate).toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
          </span>
        </p>
        <p className="text-2xl">
          Gender:
          <span className="text-green-500">{farmer.gender}</span>
        </p>
        <p className="text-2xl">
          Farmer Location:
          <span className="text-green-500">
            {farmer.sitio},{farmer.baranggay},{farmer.municipality}
          </span>
        </p>
        <p className="text-2xl">
          Phone Number:
          <span className="text-green-500">{farmer.phoneNumber}</span>
        </p>
      </div>
      <h2 className="mt-5 border-t-2 border-b-2 p-2">Farms Owned</h2>

      {farmer.geographical &&
        farmer.geographical.map((farm, index) => (
          <div key={index} className="text-2xl">
            <h3 className="font-bold">Farm {index + 1}</h3>
            <p>Farm Location: {farm.farmLocation}</p>
            <p>Farm Area: {farm.farmArea} m&sup2;</p>
            <p>Farm Category: {farm.farmCategory}</p>
          </div>
        ))}
      <h2 className="mt-5 border-t-2 border-b-2 p-2">
        Crops Productions
        <Button asChild className="mx-2" variant="secondary" size="sm">
          <Link to={`/production/create/${farmer.id}`}>+ Add Production</Link>
        </Button>
      </h2>
      {farmer.production &&
        farmer.production.map((crop, index) => (
          <div key={index} className="mb-5">
            <h3 className="border-t-2 border-b-2 p-2">Crop {index + 1}</h3>
            <p>Crop Planted: {crop.cropPlanted}</p>
            <p>
              Date Planted:{' '}
              {crop.datePlanted &&
                new Date(crop.datePlanted).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
            </p>
            <p>Area Planted: {crop.areaPlanted} m&sup2;</p>
            <p>Existence: {crop.existence}</p>
            <p>Status: {crop.status}</p>
            <Button asChild className="mx-2" size="sm">
              <Link to={`/production/${crop.id}`}>View Production</Link>
            </Button>
          </div>
        ))}
    </>
  )
}

export default FarmerProfile
