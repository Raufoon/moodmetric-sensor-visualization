import { useState } from "react"
import axios from "axios"
import PageContainer from "../components/PageContainer"
import styles from "../styles/DataUpload.module.css"

export default function DataUpload() {
  const [userId, setUserId] = useState("");
  const [userDataFile, setUserDataFile] = useState(null);

  async function onSubmitUserData(event) {
    event.preventDefault()
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
          if (event.target.files.length)
            setUserDataFile(event.target.files[0])
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
        <label>User ID</label>
        <input name="userId" onChange={onChange} placeholder="at least 5 characters" value={userId} />

        <br />
        <label>User Data (.csv)</label>
        <input type="file" onChange={onChange} name="userDataCsvFile" accept=".csv" />

        {
          userId?.length > 4 && !!userDataFile && <>
            <br />
            <input type="submit" value="Submit" />
          </>
        }
      </form>
    </PageContainer>
  )
}