import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

import AnalyticsPerMunicipality from './AnalyticsPerMunicipality'

interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  role: string
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([])
  const [activeSection, setActiveSection] = useState('users')
  const API_URL = 'https://capstone.prototype.nielmascarinas.me'

  useEffect(() => {
    axios
      .get(`${API_URL}/api/farmers`)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
      })
  }, [])

  function userList() {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800">Farmer List</h2>
        {users.map((user) => (
          <div key={user.id} className="p-4 mt-4 bg-gray-100 rounded-lg">
            <p>
              <strong>Name:</strong> {user.firstname} {user.lastname}
            </p>
            <Button asChild className="mx-2" variant="secondary" size="sm">
              <Link to={`/farmer/${user.id}`}>View Farmer</Link>
            </Button>
          </div>
        ))}
      </div>
    )
  }
  function cropGraphs() {
    return <AnalyticsPerMunicipality />
  }

  // Add more functions for other sections as needed

  return (
    <div className="flex h-screen text-black bg-gray-200">
      <aside className="w-64 bg-white shadow-md">
        {/* Sidebar content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          <ul className="mt-6 space-y-2">
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeSection === 'users' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveSection('users')}
              >
                Farmer List
              </button>
            </li>
            {/* Add more navigation links as needed */}
            <li>
              <button
                className={`w-full text-left p-2 rounded ${activeSection === 'graph' ? 'bg-gray-200' : ''}`}
                onClick={() => setActiveSection('graph')}
              >
                Crops Production
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {/* Main content */}
        {activeSection === 'users' && userList()}
        {/* Add more sections as needed */}
        {activeSection === 'graph' && cropGraphs()}
      </main>
    </div>
  )
}

export default AdminDashboard
