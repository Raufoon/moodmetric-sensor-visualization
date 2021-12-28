import formidable from 'formidable'
import fs from "fs"
const csv = require('csv-parser')
import { queryDB } from "../../utils/dbhelper"

export const config = {
  api: { bodyParser: false },
}

async function saveSkinResistenceData(userId, skinResistanceList) {
  if (!skinResistanceList || skinResistanceList.length == 0) { return }

  for (const data of skinResistanceList) {
    const query = `INSERT INTO SKIN_RESISTENCE VALUES('${userId}', FROM_UNIXTIME(${data.t}* 0.001), ${data.r});`

    try {
      await queryDB(query)
    }
    catch (err) {
      console.log(err.message)
    }
  }
}

async function saveMoodData(userId, moodList) {
  if (!moodList || moodList.length == 0) { return }

  for (const data of moodList) {
    const query = `INSERT INTO MOOD VALUES('${userId}', FROM_UNIXTIME(${data.t}* 0.001), '${data.mk}');`

    try {
      await queryDB(query)
    }
    catch (err) {
      console.log(err.message)
    }
  }
}

export default function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm({ uploadDir: "./tmp" });

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(404).json({ success: false, message: "Could not parse CSV" })
    }

    const userId = fields.userId
    const userDataCsvFile = files.userDataCsvFile;

    fs.createReadStream(userDataCsvFile.filepath)
      .pipe(csv())
      .on('data', (data) => {
        try {
          const skinResistanceDataRaw = Object.values(data)[0]
          const skinResistanceList = JSON.parse(skinResistanceDataRaw.replaceAll(`\'`, `"`))
          saveSkinResistenceData(userId, skinResistanceList)
        }
        catch (err) {
          res.status(404).json({ success: false, message: "Current CSV row (A) is empty" })
        }

        try {
          const moodDataRaw = Object.values(data)[3]
          const moodList = JSON.parse(moodDataRaw.replaceAll(`\'`, `"`))
          saveMoodData(userId, moodList)
        }
        catch (err) {
          res.status(404).json({ success: false, message: "Current CSV row (D) is empty" })
        }

      })
      .on('end', () => {
        fs.unlinkSync(userDataCsvFile.filepath)
        res.json({ success: true })
      })
      .on("error", () => {
        res.status(404).json({ success: false, message: "Something went wrong" })
      })
  })
}
