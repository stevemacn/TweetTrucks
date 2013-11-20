var mongoose = require('mongoose')
    , Feed = mongoose.model('Feed')
    , ntwitter = require('ntwitter')
    , keys = require('../../config/twitterKeys.json')
    , foundTweets = 0
    , tweetFeed
    , twit
    , resp
    , params = {
        screen_name: '',
        count: 15,
        include_rts: true
    }
    , numberSources
    , twitterSources = ['thepigandcow', 'herban_legend', 'napolitanosmkt',
                        'papiquesotruck','TurkeyAnd', 'EatOooWeeBBQ',
                        'TheMAYOBIRD', 'WingzzaTruck', 'TheTINKitchen',
                        'AutoBurger', 'Hotboxstfood', 'roamingforkNC'
                        ]

function checkCache (dateRequested) {
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() - 15); 
    
    if (dateRequested>=dt) return true
    else return false
}

function finish () {
    if (--numberSources == 0 ) {
        console.log(tweetFeed)
        console.log("Processed Tweets: " + foundTweets)
        tweetFeed.save(function(err){
            console.log(err)
        })
        resp.send(tweetFeed)
    }
}

exports.init = function (req, res) {
  
    resp = res
    foundTweets=0
    twit = new ntwitter(keys)
    numberSources = twitterSources.length
    console.log("Number of soures: " + numberSources)
    Feed
        .findOne({}
        )
        .exec(function (err, tweets) {
            if (err) throw err
            if (checkCache(tweets.dateRequested)) {
                console.log("Cache hit")
                console.log(tweets)
                res.send(tweets)  
                return null;
            } //tweets //how does this get ret
            else {
                Feed.remove({}, function(err) { 
                   console.log('Clear all previous entries') 
                });
                tweetFeed = new Feed()
            }
            tweetFeed.dateRequested=Date.now()
            console.log(tweetFeed) 
            for (i in twitterSources) { getTweets(twitterSources[i]) }
        })
}

//toDateString
function getTweets(user) {
    if (user) params.screen_name = user
    twit.getUserTimeline(params, function (err,data) {
        if (err) { 
            res.json(err)
            return 
        }
        
        data.forEach(function(tweet) {
            var geo = null
                , dt = new Date(tweet.created_at)
                , date = new Date()

            if (tweet.retweeted_status) tweet = tweet.retweeted_status
            if (tweet.coordinates) geo = tweet.coordinates.coordinates 
            if (dt.toDateString()== date.toDateString()) {
                var tweet = {
                    "datePosted" : tweet.created_at,
                    "content": tweet.text,
                    "geo": geo,
                    "screen_name": tweet.user.screen_name
                }
                tweetFeed.tweets.push(tweet)
                foundTweets++
            }
        })
        finish()
    })
}
