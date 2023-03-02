// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'

export default async function handler(req, res) {

  const { endpoint } = req.query
  // read prompt from request body
  let prompt = `
  Below are the inputs for a simple Tweet clone app's 
  endpoint for the /api/${endpoint}

  ${req.body}
  
  Please generate the JavaScript Next.js event handler code needed that handles this endpoint.



  Example:

  import fs from 'fs'

  export default async function handler(req, res) {
    let body = req.body // post body that has 
    // read from /src/pages/api/db.json
    let tweets = await fs.promises.readFile('./src/pages/api/db.json', 'utf8')
    const data = JSON.parse(tweets) // array of tweet objects containing username, text, time fields

    // [IMPLEMENTATION HERE]

    res.status(200).json({ success: true })
  }


  Begin. Code for the /api/${endpoint} endpoint, replacing // [IMPLEMENTATION HERE] with the code implementation.:
  `
  console.log({ prompt })
  // let completion = prompt
  // send to openai completion api and get response
  let response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // bearer token
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 256,
      temperature: 0.7,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0.6,
      // stop: ['\n', '###']
    })
  })
  // get response from code
  let data = await response.json()
  // console.log({ data })
  // get completion from response
  let completion = data?.choices[0].text.replace('End.', '')
  console.log({ completion })
  // const code = `export default function handler(req, res) {
  //   res.status(200).json({ name: 'John Doe' })
  // }`
  await fs.promises.writeFile(`./src/pages/api/${endpoint}.js`, completion)
  await sleep(500)
  // call the new /api/[endpoint] endpoint you just made
  const bod = JSON.stringify(req.body)
  console.log({ bod })
  let res2 = await fetch(`http://localhost:3000/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bod
  })

  console.log('res2', await res2.json())
  res.status(200).json({ mock: 'done' })
}

// sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// const file = await fs.promises.readFile('./src/pages/api/moo.js', 'utf8')