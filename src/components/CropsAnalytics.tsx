import { useEffect, useState } from 'react'
import { YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts'
import axios from 'axios'
import { TooltipProps } from 'recharts'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const date = payload[0].payload.date // Extract the date from the payload

    return (
      <div className="custom-tooltip">
        <p className="label">{`Date : ${date}`}</p> {/* Use the date here */}
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {`${item.name} : ${item.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

const CropsAnalytics = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get(
        'https://capstone.prototype.nielmascarinas.me/api/analytics/yield-trends-by-crop',
      )
      .then((response) => {
        const data = response.data
        const transformedData = Object.entries(data).map(
          ([date, crops]: [string, Record<string, number>]) => ({
            date,
            ...crops,
          }),
        )

        setData(transformedData)
      })
  }, [])

  return (
    <>
      <h2>Sample Analytics of Crop Production</h2>
      <p className="text-yellow-400 mb-7">
        Not official for further improvement for demo purposes only.
      </p>
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="date" /> */}
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Tomatoes" fill="#8884d8" barSize={20} />
        <Bar dataKey="Corn" fill="#82ca9d" barSize={20} />
        <Bar dataKey="Carrot" fill="#ffc658" barSize={20} />
        <Bar dataKey="Cacao" fill="#ff7300" barSize={20} />
        <Bar dataKey="Potato" fill="#387908" barSize={20} />
        <Bar dataKey="Peanut" fill="#a4de6c" barSize={20} />
        <Bar dataKey="Banana" fill="#d0ed57" barSize={20} />
      </BarChart>
    </>
  )
}

export default CropsAnalytics
