export default function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const userId = req.query.userId
  const timestampBegin = req.query.timestampBegin
  const timestampEnd = req.query.timestampEnd

  res.json({
    success: true,
    data: []
  })
}
