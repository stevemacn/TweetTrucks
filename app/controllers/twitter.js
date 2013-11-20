var mongoose = require('mongoose')
    , Feed = mongoose.model('Feed')
    , ntwitter = require('ntwitter')
    , keys = require('../../config/twitterKeys.json')
    , maxTweets = 15
    , foundTweets = 0
    , tweetFeed
    , twit
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
    if (--numberSources == 0 ) console.log(tweetFeed)
}

exports.init = function () {
   
    foundTweets=0
    twit = new ntwitter(keys)
    numberSources = twitterSources.length
    console.log(numberSources)
    Feed
        .find({}
        )
        .exec(function (err, tweets) {
            if (err) throw err
            
            if (checkCache(tweets.dateRequested)) return tweets //how does this get ret
            else tweetFeed = new Feed()
                
            tweetFeed.dateRequested=Date.now()
            
            for (i in twitterSources) { getTweets(twitterSources[i]) }
        })
}

//toDateString
function getTweets(user) {
    if (user) params.screen_name = user
    twit.getUserTimeline(params, function (err,data) {
        if (err) res.json(err) 
        var  countRT = countT = 0
        data.forEach(function(tweet) {
            if (tweet.retweeted_status) {
                tweet = tweet.retweeted_status
                countRT++
            } else {
                countT++
            }
            var geo = null
            if (tweet.coordinates) geo = tweet.coordinates.coordinates 
            var dt = new Date(tweet.created_at)
            var date = new Date()
            if (dt.toDateString()== date.toDateString()) {
                var tweet = {
                    "datePosted" : tweet.created_at,
                    "content": tweet.text,
                    "geo": geo,
                    "screen_name": tweet.user.screen_name
                }
                tweetFeed.tweets.push(tweet)
            }
        })
        finish()
        foundTweets = countRT + countT + foundTweets
    })

}
