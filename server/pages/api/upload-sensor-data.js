import formidable from 'formidable'
import fs from "fs"
const csv = require('csv-parser')
import { queryDB } from "../../utils/dbhelper"

export const config = {
  api: { bodyParser: false },
}

export default async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const form = new formidable.IncomingForm({ uploadDir: "tmp" })
  form.keepExtensions = true

  // Extract csv file and user id from request
  const { userId, userDataCsvFile } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err)
        reject()
      else
        resolve({ userId: fields.userId, userDataCsvFile: files.userDataCsvFile })
    })
  })

  let rInsertQuery = 'INSERT IGNORE INTO SKIN_RESISTENCE VALUES'
  let mkInsertQuery = 'INSERT IGNORE INTO MOOD VALUES'

  fs.createReadStream(userDataCsvFile.filepath)
    .pipe(csv())
    .on('data', function handleData(csvRow) {
      try {
        const skinResistanceDataRaw = Object.values(csvRow)[0]
        const skinResistanceList = JSON.parse(skinResistanceDataRaw.replaceAll(`\'`, `"`))

        for (const data of skinResistanceList) {
          rInsertQuery += `('${userId}', FROM_UNIXTIME(${data.t}* 0.001), ${data.r}),`
        }
      }
      catch (err) { }

      try {
        const moodDataRaw = Object.values(csvRow)[3]
        const moodList = JSON.parse(moodDataRaw.replaceAll(`\'`, `"`))

        for (const data of moodList) {
          mkInsertQuery += `('${userId}', FROM_UNIXTIME(${data.t}* 0.001), '${data.mk}'),`
        }
      }
      catch (err) { }
    })
    .on('end', async () => {
      fs.unlinkSync(userDataCsvFile.filepath)
      rInsertQuery = rInsertQuery.slice(0, -1) + ';'
      mkInsertQuery = mkInsertQuery.slice(0, -1) + ';'

      try {
        await queryDB(rInsertQuery)
      }
      catch (err) {
        res.json({ success: false, message: "Could not upload r data" })
        return
      }

      try {
        await queryDB(mkInsertQuery)
      }
      catch (err) {
        res.json({ success: false, message: "Uploaded r data but could not upload mk data" })
        return
      }

      res.json({ success: true })
    })
    .on("error", () => {
      res.status(404).json({ success: false, message: "Something went wrong" })
    })
}
