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

POST trucks/:truckName/:temporality/:time/:location/:id

Setup
---
    npm install
    bower install
    grunt
    
