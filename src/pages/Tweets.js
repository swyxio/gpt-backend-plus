import React from 'react'

// tweet component displaying username, tweet, timestamp, and image
// styled with tailwindcss
function Tweet({ tweet }) {
  const { username, text, timestamp } = tweet
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <div className="flex-shrink-0">
          <img
            className="w-10 h-10 rounded-full"
            src={`https://unavatar.io/${username}`}
            alt=""
          />
          {/* src={`https://robohash.org/${username}`} */}
        </div>
        <div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-blue-300 hover:text-blue-100"
            >
              {username}
            </a>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 hover:underline"
            >
              {timestamp}
            </a>
          </div>
          <div className="text-sm text-gray-100">{text}</div>
        </div>
      </div>
      {/* {image && (
        <div className="flex-shrink-0">
          <img className="w-full rounded-lg" src={'https://unavatar.io/' + image} alt="" />
        </div>
      )} */}
    </div>
  )
}

// component that renders a list of tweets
export function Tweets() {
  const [tweets, setTweets] = React.useState([])

  // fetch list of tweets from /api/readTweets endpoint every second
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/readTweets')
      const ret = await res.json()
      setTweets(JSON.parse(ret.tweets))
    }, 1000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Tweets</h1>
      <div className="space-y-4 mb-4">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}