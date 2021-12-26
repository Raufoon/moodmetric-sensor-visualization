import PageContainer from "../components/PageContainer"
import styles from "../styles/DataUpload.module.css"

async function onSubmitUserData(values) {

}

export default function DataUpload() {
  return (
    <PageContainer>
      <form className={styles.formContainer} onSubmit={onSubmitUserData}>
        <label htmlFor="user-id">User ID</label>
        <input name="user-id" />

        <br />

        <label htmlFor="user-data-csv-file">User Data (.csv)</label>
        <input type="file" name="user-data-csv-file" accept=".csv" />

        <br />

        <input type="submit" value="Submit" />
      </form>
    </PageContainer>
  )
}