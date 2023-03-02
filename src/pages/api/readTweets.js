import fs from 'fs'

export default async function handler(req, res) {

  // read from /src/pages/api/db.json
  let tweets = await fs.promises.readFile('./src/pages/api/db.json', 'utf8')
  res.status(200).json({ tweets })

}