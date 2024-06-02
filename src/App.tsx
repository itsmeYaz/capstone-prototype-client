import FarmerProfile from '@/components/FarmerProfile.tsx'
import { Routes, Route } from 'react-router-dom'
import ViewProduction from '@/components/ViewProduction.tsx'
import ListOfFarmers from '@/components/ListOfFarmers.tsx'
import AddHarvest from '@/components/AddHarvest.tsx'
import EditHarvest from '@/components/EditHarvest.tsx'
import AddProduction from '@/components/AddProduction.tsx'
import AddGeographical from '@/components/AddGeographical.tsx'
import AdminDashboard from './components/AdminDashboard'
import LandingPage from './components/LandingPage'

function App() {
  return (
    <main className="font-poppins">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/farmer/:id" element={<FarmerProfile />} />
        <Route path="/create-geographical/:id" element={<AddGeographical />} />
        <Route path="/production/:id" element={<ViewProduction />} />
        <Route path="/production/create/:id" element={<AddProduction />} />
        <Route path="/create/:id" element={<AddHarvest />} />
        <Route path="/update/:id" element={<EditHarvest />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/farmer" element={<ListOfFarmers />} />
      </Routes>
    </main>
  )
}

export default App
