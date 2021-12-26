import { useState } from "react"
import PageContainer from "../components/PageContainer"
import styles from "../styles/DataUpload.module.css"

async function onSubmitUserData(values) {

}

export default function DataUpload() {
  const [userId, setUserId] = useState(null);
  const [userDataFile, setUserDataFile] = useState(null);

  function onChange(event) {
    switch (event.target.name) {
      case "user-id":
        {
          const value = event.target.value
          if (value && value.length > 4)
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
      <form className={styles.formContainer} onSubmit={onSubmitUserData}>
        <label htmlFor="user-id">User ID</label>
        <input name="user-id" onChange={onChange} placeholder="at least 5 characters" value={userId} />

        <br />
        <label htmlFor="user-data-csv-file">User Data (.csv)</label>
        <input type="file" onChange={onChange} name="user-data-csv-file" accept=".csv" />

        {
          !!userId && !!userDataFile && <>
            <br />
            <input type="submit" value="Submit" />
          </>
        }
      </form>
    </PageContainer>
  )
}