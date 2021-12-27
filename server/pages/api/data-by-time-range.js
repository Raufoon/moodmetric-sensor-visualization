export default function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const userId = req.query.userId
  const startTimestamp = req.query.startTimestamp
  const endTimestamp = req.query.endTimestamp

  console.log({
    userId, startTimestamp, endTimestamp
  })

  res.json({
    success: true,
    data: []
  })

  res.end()
}
