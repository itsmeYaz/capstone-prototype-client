import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button.tsx'
import { Link, useParams } from 'react-router-dom'
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

  const [activeSection, setActiveSection] = useState('profile')

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

  function farmerDetails() {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center space-x-6">
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'
            }
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {farmer.firstname}'s Profile
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
          <p>
            <strong>Name:</strong>
            <span className="block">
              {farmer.firstname} {farmer.middlename}. {farmer.lastname}
            </span>
          </p>
          <p>
            <strong>Birthdate:</strong>
            <span className="block">
              {farmer.birthdate &&
                new Date(farmer.birthdate).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
            </span>
          </p>
          <p>
            <strong>Gender:</strong>
            <span className="block">{farmer.gender}</span>
          </p>
          <p>
            <strong>Location:</strong>
            <span className="block">
              {farmer.sitio}, {farmer.baranggay}, {farmer.municipality}
            </span>
          </p>
          <p>
            <strong>Phone:</strong>
            <span className="block">{farmer.phoneNumber}</span>
          </p>
        </div>
      </div>
    )
  }

  function farmsOwned() {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {farmer.firstname}'s Farms
          </h2>
          <Button asChild className="mx-2" variant="secondary" size="sm">
            <Link to={`/create-geographical/${id}`}>+ Add Farm</Link>
          </Button>
        </div>

        {farmer.geographical &&
          farmer.geographical.map((farm, index) => (
            <div key={index} className="p-4 mt-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold">Farm {index + 1}</h3>
              <p>
                <strong>Location:</strong> {farm.farmLocation}
              </p>
              <p>
                <strong>Area:</strong> {farm.farmArea} m&sup2;
              </p>
              <p>
                <strong>Category:</strong> {farm.farmCategory}
              </p>
            </div>
          ))}
      </div>
    )
  }

  function farmerProduction() {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {farmer.firstname}'s Crops Productions
          </h2>
          <Button asChild className="mx-2" variant="secondary" size="sm">
            <Link to={`/production/create/${farmer.id}`}>+ Add Production</Link>
          </Button>
        </div>

        {farmer.production &&
          farmer.production.map((crop, index) => (
            <div key={index} className="p-4 mt-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-bold">
                {crop.cropPlanted} Production
              </h3>
              <p>
                <strong>Crop Planted:</strong> {crop.cropPlanted}
              </p>
              <p>
                <strong>Date Planted:</strong>
                {crop.datePlanted &&
                  new Date(crop.datePlanted).toLocaleDateString('en-GB', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
              </p>
              <p>
                <strong>Area Planted:</strong> {crop.areaPlanted} m&sup2;
              </p>
              <p>
                <strong>Existence:</strong> {crop.existence}
              </p>
              <p>
                <strong>Status:</strong> {crop.status}
              </p>
              <Button asChild className="mx-2" size="sm" variant="secondary">
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
      </div>
    )
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

  return (
    <div className="flex h-screen text-black bg-gray-200">
      <aside className="w-64 bg-white shadow-md">
        {/* Sidebar content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">
            Welcome, {farmer.firstname}!
          </h2>
          <ul className="mt-6 space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeSection === 'profile' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeSection === 'farms' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveSection('farms')}
              >
                Farms
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeSection === 'productions' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveSection('productions')}
              >
                Productions
              </button>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {/* Main content */}
        {/* Your existing code goes here */}
        {activeSection === 'profile' && farmerDetails()}
        {activeSection === 'farms' && farmsOwned()}
        {activeSection === 'productions' && farmerProduction()}
      </main>
    </div>
  )
}

export default FarmerProfile
