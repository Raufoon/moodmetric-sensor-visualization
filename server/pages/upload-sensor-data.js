import { useRef, useState } from "react"
import axios from "axios"
import PageContainer from "../components/PageContainer"
import styles from "../styles/upload-sensor-data.module.css"

export default function () {
  const [userId, setUserId] = useState("")
  const [userDataFile, setUserDataFile] = useState(null)
  const [isUploading, setUploading] = useState(false)
  const csvInputRef = useRef(null)

  async function onSubmitUserData(event) {
    event.preventDefault()
    setUploading(true)

    const data = new FormData()
    data.append('userDataCsvFile', userDataFile)
    data.append('userId', userId)

    try {
      await axios.post("api/upload-sensor-data", data)
      window.alert("Successfully submitted user data")
    }
    catch (err) {
      window.alert("ERROR: Failed to submit")
    }

    setUserId("")
    setUserDataFile(null)
    setUploading(false)
    csvInputRef.current.value = null
  }

  function onChange(event) {
    switch (event.target.name) {
      case "userId":
        {
          const value = event.target.value
          setUserId(value)
          break
        };

      case "userDataCsvFile":
        {
          if (event.target.files.length) {
            setUserDataFile(event.target.files[0])
          }
          break
        }
    }
  }

  return (
    <PageContainer>
      <h1>Upload user data</h1>

      <form
        className={styles.formContainer}
        onSubmit={onSubmitUserData}
      >
        <label>User ID:</label>
        <input name="userId" onChange={onChange} placeholder="at least 5 characters" value={userId} />

        <br />
        <label>User Data (.csv):</label>
        <input ref={csvInputRef} type="file" onChange={onChange} name="userDataCsvFile" accept=".csv" />

        {
          !isUploading && userId?.length > 4 && !!userDataFile && <>
            <br />
            <input type="submit" value="Submit" />
          </>
        }

        {
          isUploading && <i>Uploading data...</i>
        }
      </form>
    </PageContainer>
  )
}