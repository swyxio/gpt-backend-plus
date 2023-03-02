
  import fs from 'fs'

export default async function handler(req, res) {
  let body = req.body // post body that has 
  // read from /src/pages/api/db.json
  let tweets = await fs.promises.readFile('./src/pages/api/db.json', 'utf8')
  const data = JSON.parse(tweets) // array of tweet objects containing username, text, time fields
  
  // [IMPLEMENTATION HERE]
  
  // Create new tweet object
  const newTweet = {
    username: body.username,
    text: body.text,
    time: new Date().toISOString()
  }
  
  // Add new tweet to list of tweets
  data.push(newTweet);
  
  // Write list of tweets back to db.json file
  await fs.promises.writeFile('./src/pages/api/db.json', JSON.stringify(data));
  
  res.status(200).json({ success: true })
}