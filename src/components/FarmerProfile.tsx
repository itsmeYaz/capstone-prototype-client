import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button.tsx'
import { Link, useParams } from 'react-router-dom'
import { User } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Farmer {
  firstname: string
  middlename: string
  lastname: string
  birthdate: string
  gender: string
  sitio: string
  baranggay: string
  municipality: string
  phoneNumber: string
  geographical: Array<{
    farmLocation: string
    farmArea: number
    farmCategory: string
  }>
  id: string
  production: Array<{
    cropPlanted: string
    datePlanted: Date
    areaPlanted: number
    existence: string
    status: string
    id: string
  }>
}

const defaultFarmer: Farmer = {
  firstname: '',
  middlename: '',
  lastname: '',
  birthdate: '',
  gender: '',
  sitio: '',
  baranggay: '',
  municipality: '',
  phoneNumber: '',
  geographical: [],
  id: '',
  production: [],
}

const FarmerProfile = () => {
  const [farmer, setFarmer] = useState<Farmer | null>(defaultFarmer)
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'
  // const [id, setId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${API_URL}/api/farmers/${id}`)
      .then((res) => {
        setFarmer(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
      .finally(() => {
        setIsLoading(false) // Set loading to false when the fetch completes
      })
  }, [id])

  if (isLoading) {
    return <p>Fetching farmer please wait...</p>
  }

  function handleDelete(id) {
    axios
      .delete(`${API_URL}/api/production/${id}`)
      .then(() => {
        console.log('item deleted')
        setFarmer((prevFarmer) => ({
          ...prevFarmer,
          production: prevFarmer.production.filter((item) => item.id !== id),
        }))
      })
      .catch((error) => {
        console.error('Error deleting data: ', error)
      })
  }

  console.log(id)
  return (
    <>
      <h2 className="flex justify-center mb-6">
        <User />
        {farmer.firstname}'s Profile
      </h2>
      <h5 className="mb-1 text-red-300">
        Note: This is the farmers POV when they view their profile
      </h5>
      <div className="grid grid-cols-2 gap-4">
        <p>
          Farmer Name:
          <span className="text-green-500">
            {farmer.firstname} {farmer.middlename}. {farmer.lastname}
          </span>
        </p>
        <p>
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
        <p>
          Gender:
          <span className="text-green-500">{farmer.gender}</span>
        </p>
        <p>
          Farmer Location:
          <span className="text-green-500">
            {farmer.sitio},{farmer.baranggay},{farmer.municipality}
          </span>
        </p>
        <p>
          Phone Number:
          <span className="text-green-500">{farmer.phoneNumber}</span>
        </p>
      </div>
      <h2 className="p-2 mt-5 border-t-2 border-b-2">
        {farmer.firstname} Farms Owned
        <Button asChild className="mx-2" variant="secondary" size="sm">
          <Link to={`/create-geographical/${id}`}>+ Add Farm</Link>
        </Button>
      </h2>

      {farmer.geographical &&
        farmer.geographical.map((farm, index) => (
          <div key={index}>
            <h3>Farm {index + 1}</h3>
            <p>Farm Location: {farm.farmLocation}</p>
            <p>Farm Area: {farm.farmArea} m&sup2;</p>
            <p>Farm Category: {farm.farmCategory}</p>
          </div>
        ))}
      <h2 className="p-2 mt-5 border-t-2 border-b-2">
        {farmer.firstname} Crops Productions
        <Button asChild className="mx-2" variant="secondary" size="sm">
          <Link to={`/production/create/${farmer.id}`}>+ Add Production</Link>
        </Button>
      </h2>
      {farmer.production &&
        farmer.production.map((crop, index) => (
          <div key={index} className="mb-5">
            <h3 className="p-2 border-t-2 border-b-2">Crop {index + 1}</h3>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the production and remove author data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(crop.id)}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
    </>
  )
}

export default FarmerProfile
