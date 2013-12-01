TweetTruck (Support for MobileME)
==========

1. Recover tweets for the food trucks in the charlotte area. 
2. Create an api for users to augment the data found from twitter.    

Requirements
--
1. Install mongoDB. Run it in the background
2. Add your own twitter developer keys 
3. Edit "config/twitterKeysSample.json" with your keys
4. Save "config/twitterKeysSample.json" to "config/twitterKeys.json"

API routes
---
    GET tweets/
    GET trucks/

Example Post (tagging truck name and tweet evidence id)

    curl -X POST -H "Content-Type: application/json" -d '{"truckname":"papiquesotruck", "id":"529a2c05c4161de97f000004"}' http://localhost:3000/truck

Options: truckname, validity, temporality, location, id(of tweet) 

If a tweet is geotagged this value will be used unless location is specified

Setup
---
    npm install
    bower install
    grunt
    
