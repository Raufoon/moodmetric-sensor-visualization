import { useCallback, useMemo, useState } from "react"
import axios from "axios"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts"
import styles from '../styles/GraphViewer.module.css'

function XAxisTick(props) {
  const { x, y, stroke, payload } = props

  return (
    <g transform={`translate(${x},${y}) scale(0.7)`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" >
        {new Date(payload.value * 1000).toLocaleTimeString()}
      </text>
    </g>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className={styles.graphTooltip}>
        <label>{new Date(label * 1000).toLocaleTimeString()}</label>
        {
          Object.entries(data).map(pair => <label><b>{pair[0]}:</b> {pair[1]}</label>)
        }
      </div>
    );
  }

  return null;
};

export default function GraphViewer() {
  const [userId, setUserId] = useState("")
  const [date, setDate] = useState(0)
  const [time, setTime] = useState(0)
  const [chartData, setChartData] = useState([])

  const onChange = useCallback((event) => {
    switch (event.target.name) {
      case "userId":
        setUserId(event.target.value)
        break

      case "date":
        setDate(event.target.value)
        break

      case "time":
        setTime(event.target.value)
        break
    }
  }, [])

  const onSubmit = useCallback(async function (event) {
    event.preventDefault()

    try {
      const response = await axios.get("api/data-by-time-range", {
        params: {
          userId,
          startTimestamp: new Date(date + " " + time).getTime() / 1000,
        }
      })

      const { data } = response

      if (data?.success) {
        setChartData(data.data)
      }
    }
    catch (err) {
      window.alert("Failed to query")
    }
  }, [userId, date, time])

  const totalR = useMemo(() => {
    if (!chartData)
      return 0

    return chartData.filter(data => !!data.R).length
  }, [chartData])

  const totalMk = useMemo(() => {
    if (!chartData)
      return 0

    return chartData.filter(data => !!data.MK).length
  }, [chartData])

  const avgR = useMemo(() => {
    const rData = chartData.filter(data => !!data.R)

    if (!rData || rData.length == 0)
      return 0

    let avg = rData[0].R

    for (const d of rData) {
      avg = (avg + d.R) / 2
    }

    return avg

  }, [chartData])


  return (
    <div className={styles.container}>
      <form className={styles.control} onSubmit={onSubmit}>
        <label>User ID</label>
        <label>Date</label>
        <label>Time</label>
        <label>&nbsp;</label>

        <input name="userId" onChange={onChange} placeholder="at least 5 characters" />
        <input name="date" onChange={onChange} type="date" />
        <input name="time" onChange={onChange} type="time" step="1" />

        <div>
          <input type="submit" value="Load" />
        </div>
      </form>

      <ResponsiveContainer width={'95%'} height={350} className={styles.graphContainer}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="R" stroke="#8884d8" dot={{ fill: '#8884d8' }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="T" tick={<XAxisTick />} />
          <YAxis dataKey="R" />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
        </LineChart>
      </ResponsiveContainer>

      <div >
        <h3>Summary:</h3>
        <div className={styles.summary}>
          <label>Total "R": {totalR}</label>
          <label>Total "MK": {totalMk}</label>
          <label>Average "R": {avgR}</label>
        </div>
      </div>
    </div>
  )
}