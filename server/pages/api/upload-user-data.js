import formidable from 'formidable'
import fs from "fs"
const csv = require('csv-parser')
import { closeDB, connectDB, queryDB } from "../../utils/dbhelper"

export const config = {
  api: {
    bodyParser: false,
  },
}

async function saveSkinResistenceData(userId, skinResistanceList) {
  if (!skinResistanceList || skinResistanceList.length == 0) { return }

  for (const data of skinResistanceList) {
    const query = `INSERT INTO SKIN_RESISTENCE VALUES('${userId}', to_timestamp(${data.t / 1000.0}), ${data.r});`
    console.log(query)
    await queryDB(query)
  }
}

async function saveMoodData(userId, moodList) {
  if (!moodList || moodList.length == 0) { return }

  for (const data of moodList) {
    const query = `INSERT INTO MOOD VALUES('${userId}', to_timestamp(${data.t / 1000.0}), '${data.mk}');`
    console.log(query)
    await queryDB(query)
  }
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const form = new formidable.IncomingForm({ uploadDir: "./tmp" });
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
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
          // empty data
        }

        try {
          const moodDataRaw = Object.values(data)[3]
          const moodList = JSON.parse(moodDataRaw.replaceAll(`\'`, `"`))
          saveMoodData(userId, moodList)
        }
        catch (err) {
          // empty data
        }

      })
      .on('end', () => {
        fs.unlinkSync(userDataCsvFile.filepath)
        res.json({
          success: true
        })
      })
      .on("error", () => {
        res.status(404).json({
          success: false
        })
      })
  })
}
