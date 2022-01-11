import { useEffect, useState } from "react"
import axios from "axios"

export default function SkinResistanceSummary({ userId }) {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    axios
      .get("api/summary", { params: { userId } })
      .then(response => response.data.success ? response.data.data : Promise.reject())
      .then(data => setSummary(data))
      .catch(err => setSummary(null))
  }, [userId])

  return (
    <>
      <h3>Summary of skin resistence for user {userId} </h3>
      {
        summary && (
          <div style={{ display: 'flex', gap: '2rem', fontSize: "small" }}>
            <p>Minimum: {summary.minR} in ({new Date(summary.minRt).toLocaleString()})</p>
            <p>Maximum: {summary.maxR} in ({new Date(summary.maxRt).toLocaleString()})</p>
            <p>Average: {summary.avgR}</p>
          </div>
        )
      }
    </>
  )
}
