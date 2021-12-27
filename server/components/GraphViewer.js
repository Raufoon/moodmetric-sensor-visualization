import styles from '../styles/GraphViewer.module.css'

export default function GraphViewer() {
  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <label>User ID</label>
        <label>Begin</label>
        <label>End</label>
        <label>&nbsp;</label>

        <input name="userId" placeholder="at least 5 characters" />
        <input name="startTimestamp" type="datetime-local" />
        <input name="endTimestamp" type="datetime-local" />

        <div>
          <input type="submit" value="Load" />
        </div>
      </div>
    </div>
  )
}