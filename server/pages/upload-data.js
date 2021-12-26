import { useState } from "react"
import axios from "axios"
import PageContainer from "../components/PageContainer"
import styles from "../styles/DataUpload.module.css"

export default function DataUpload() {
  const [userId, setUserId] = useState("");
  const [userDataFile, setUserDataFile] = useState(null);

  async function onSubmitUserData(event) {
    event.preventDefault()

    const data = new FormData()
    data.append("user-id", userId)
    data.append("user-data-csv-file", userDataFile)

    try {
      const response = await axios.post("api/upload-csv", data);
      console.log(response)
      alert("Data uploaded successfully")
    }
    catch (err) {
      alert("Error:", err.message)
    }
  }

  function onChange(event) {
    switch (event.target.name) {
      case "user-id":
        {
          const value = event.target.value
          setUserId(value)
          break
        };

      case "user-data-csv-file":
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
        <label htmlFor="user-id">User ID</label>
        <input name="user-id" onChange={onChange} placeholder="at least 5 characters" value={userId} />

        <br />
        <label htmlFor="user-data-csv-file">User Data (.csv)</label>
        <input type="file" onChange={onChange} name="user-data-csv-file" accept=".csv" />

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