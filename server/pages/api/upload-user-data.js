import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Return a "method not allowed" error
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });
}
