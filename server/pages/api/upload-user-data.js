import formidable from 'formidable'
import fs from "fs"
const csv = require('csv-parser')

export const config = {
  api: {
    bodyParser: false,
  },
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
        const skinResistData = Object.values(data)[0]
        const moodData = Object.values(data)[3]
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
