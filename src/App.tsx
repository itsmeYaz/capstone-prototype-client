import FarmerProfile from '@/components/FarmerProfile.tsx'
import FarmLocation from '@/components/FarmLocation.tsx'
import { Routes, Route } from 'react-router-dom'
import ViewProduction from '@/components/ViewProduction.tsx'
import ListOfFarmers from '@/components/ListOfFarmers.tsx'
import AddHarvest from '@/components/AddHarvest.tsx'
import EditHarvest from '@/components/EditHarvest.tsx'
import AddProduction from '@/components/AddProduction.tsx'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ListOfFarmers />} />
        <Route path="/farmer/:id" element={<FarmerProfile />} />
        <Route path="/production/:id" element={<ViewProduction />} />
        <Route path="/production/create/:id" element={<AddProduction />} />
        <Route path="/create/:id" element={<AddHarvest />} />
        <Route path="/update/:id" element={<EditHarvest />} />
      </Routes>
    </main>
  )
}

export default App
