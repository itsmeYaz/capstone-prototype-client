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
  const [keys, setKeys] = useState([])
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

        // Update the keys state variable
        if (transformedData.length > 0) {
          const keys = Array.from(
            new Set(
              transformedData.flatMap((item) =>
                Object.keys(item).filter((key) => key !== 'date'),
              ),
            ),
          )
          console.log('Keys:', keys) // Log the keys
          setKeys(keys)
        }
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
        {keys.map((key, index) => (
          <Bar
            key={index}
            dataKey={key}
            fill={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
            barSize={20}
          />
        ))}
      </BarChart>
    </>
  )
}

export default CropsAnalytics
