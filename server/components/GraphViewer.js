import { useCallback, useState } from "react"
import axios from "axios"
import styles from '../styles/GraphViewer.module.css'

export default function GraphViewer() {
  const [userId, setUserId] = useState("")
  const [startTimestamp, setStartTimestamp] = useState(0)
  const [endTimestamp, setEndTimestamp] = useState(0)

  const onChange = useCallback((event) => {
    switch (event.target.name) {
      case "userId":
        setUserId(event.target.value)
        break

      case "startTimestamp":
        setStartTimestamp(event.target.value)
        break

      case "endTimestamp":
        setEndTimestamp(event.target.value)
        break
    }
  }, [])

  const onSubmit = useCallback(async function (event) {
    event.preventDefault()

    try {
      const response = await axios.post("api/data-by-time-range", {
        userId,
        startTimestampMs: new Date(startTimestamp).getTime() / 1000,
        endTimestampMs: new Date(endTimestamp).getTime() / 1000
      })

      if (response.success) {
        console.response(data)
      }
      else {
        throw new Error()
      }
    }
    catch (err) {
      window.alert("Failed to query")
    }
  }, [])

  return (
    <div className={styles.container}>
      <form className={styles.control} onSubmit={onSubmit}>
        <label>User ID</label>
        <label>Begin</label>
        <label>End</label>
        <label>&nbsp;</label>

        <input name="userId" onChange={onChange} placeholder="at least 5 characters" />
        <input name="startTimestamp" onChange={onChange} type="datetime-local" />
        <input name="endTimestamp" onChange={onChange} type="datetime-local" />

        <div>
          <input type="submit" value="Load" />
        </div>
      </form>
    </div>
  )
}