import { useCallback, useMemo, useState } from "react"
import axios from "axios"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts"
import styles from '../styles/GraphViewer.module.css'

function XAxisTick(props) {
  const { x, y, payload } = props
  const label = new Date(payload.value * 1000).toLocaleString()
  const [label1, label2] = label.split(",")

  return (
    <g transform={`translate(${x},${y}) scale(0.7)`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
        {label1}
      </text>
      <text x={0} y={20} dy={16} textAnchor="end" fill="#666">
        {label2}
      </text>
    </g>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    const data = payload[0].payload

    return (
      <div className={styles.graphTooltip}>
        <label>{new Date(label * 1000).toLocaleString()}</label>
        {
          Object.entries(data)
            .map(pair =>
              <label><b>{pair[0]}:</b> {pair[1]}</label>)
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
  const [limit, setLimit] = useState(100)
  const [chartData, setChartData] = useState([])
  const [isLoading, setLoading] = useState(false)

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

      case "limit":
        setLimit(event.target.value)
        break
    }
  }, [])

  const onSubmit = useCallback(async function (event) {
    event.preventDefault()

    try {
      setLoading(true)

      const response = await axios.get("api/data-by-time-range", {
        params: {
          userId,
          startTimestamp: new Date(date + " " + time).getTime() / 1000,
          limit
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

    setLoading(false)
  }, [userId, date, time, limit])

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
    const rData = chartData?.filter(data => !!data.R)

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
        <label>Limit</label>
        <label>&nbsp;</label>

        <input name="userId" value={userId} onChange={onChange} placeholder="at least 5 characters" />
        <input name="date" value={date} onChange={onChange} type="date" />
        <input name="time" value={time} onChange={onChange} type="time" step="1" />
        <input name="limit" value={limit} onChange={onChange} type="number" />

        <div>
          {
            isLoading ? "Loading..." : <input className={styles.dataLoaderBtn} type="submit" value="Load" />
          }
        </div>
      </form>


      <ResponsiveContainer width={'95%'} height={350} className={styles.graphContainer}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="R" stroke="#8884d8" dot={{ fill: '#8884d8' }} yAxisId={0} />
          <Line type="monotone" dataKey="MK" stroke="transparent" dot={{ fill: '#fa2' }} yAxisId={1} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="T" tick={<XAxisTick />} />
          <YAxis dataKey="R" yAxisId={0} />
          <YAxis padding={{ top: 20, bottom: 20 }} dataKey="MK" type="category" yAxisId={1} orientation="right" />
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