import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from './Loading'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function AnalyticsPerMunicipality() {
  const [data, setData] = useState([])
  const [municipalities, setMunicipalities] = useState([])
  const [barColor, setBarColor] = useState('#8884d8')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const query = useQuery()
  const [selectedMunicipality, setSelectedMunicipality] = useState(
    query.get('municipality') || '',
  )

  useEffect(() => {
    axios
      .get(
        'https://capstone.prototype.nielmascarinas.me/api/analytics/municipalities-and-crops',
      )
      .then((response) => {
        setMunicipalities(response.data.municipalities)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (selectedMunicipality) {
      setLoading(true)
      axios
        .get(
          `https://capstone.prototype.nielmascarinas.me/api/analytics/total-harvest/${selectedMunicipality}`,
        )
        .then((response) => {
          setData(response.data)
          setBarColor('#' + Math.floor(Math.random() * 16777215).toString(16))
          setLoading(false)
        })
        .catch((error) => {
          console.error('Error fetching data: ', error)
          setLoading(false)
        })
    }
  }, [selectedMunicipality])

  const handleMunicipalityChange = (event) => {
    setSelectedMunicipality(event.target.value)
    navigate(`?municipality=${event.target.value}`)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h2 className="mb-2">Production of Crops Per Municipality</h2>
      <select
        value={selectedMunicipality}
        onChange={handleMunicipalityChange}
        className="p-2 mb-4 bg-red-500"
      >
        <option value="">Select municipality</option>
        {municipalities.map((municipality) => (
          <option key={municipality} value={municipality}>
            {municipality}
          </option>
        ))}
      </select>

      <BarChart width={850} height={450} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cropPlanted" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill={barColor} />
      </BarChart>
    </div>
  )
}

export default AnalyticsPerMunicipality
