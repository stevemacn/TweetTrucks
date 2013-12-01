var mongoose = require('mongoose')
    , Truck = mongoose.model('Truck')
    , Feed = mongoose.model('Feed')

exports.get = function (req, res) {
    Truck
        .find({})
        .exec(function (err, trucks) {
            if (err) throw err
            if (trucks) res.json(trucks)
        })
}

function populateTruck (params, truck, user) {
    console.log(user)
    //if (!user) return null
    
    //Populate the trucks
    truck.date=Date.now()
    if (params.temporality) truck.temporality = params.temporality
    if (params.location) truck.location = params.location
    if (params.validity) truck.validity = params.validity
    truck.version++
    Feed
        .findOne({})
        .exec(function (err, tweets) {
            if (err) throw err
            if (tweets) {
                tweets = tweets.tweets
                for (i  in tweets) {
                    var tweet = tweets[i]
                    if (tweet._id==params.id) {
                        var twt = {
                            username : user,
                            version: truck.version,
                            screen_name: tweet.screen_name,
                            content: tweet.content,
                            geo: tweet.geo,
                            datePosted: tweet.datePosted,
                            avatar: tweet.avatar
                        }
                        if (twt.geo && !truck.location) truck.location = twt.geo
                        tweet.username = user 
                        tweet.version = truck.version
                        truck.tweets.push(twt)
                        console.log(truck)
                    }
                }
             }
             truck.save()
         })       
}

exports.del = function (req, res) {
    var now = new Date()
    
    //just for testing, to avoid using mocha
    Truck
        .find({date: {$lt: now.setDate(now.getDate()-1)}, temporality:"today"})
        .exec(function(err, trucks){
            if (err) throw err
            console.log(trucks)
        })
    
    Truck
        .remove({})
        .exec(function(err,slt) {
            res.send("Removed")
        })
}


exports.post = function (req, res) {
    var params = null
    if (req.params) params = req.params  
    if (req.body) params = req.body   
    
    if (!params) return null

    Truck
        .findOne({truckName: params.truckname})
        .exec(function (err, truck) {
            if (err) throw err
            if (!truck) {
                console.log("New truck created...")
                var truck = new Truck() 
                truck.truckName=params.truckname
            }
            console.log(truck)
            populateTruck(params, truck, req.user)
        })
    Truck
        .remove({date: {$lt: now.setDate(now.getDate()-1)}, temporality:"today"})
        .exec(function(err, trucks){
            if (err) throw err
            console.log(trucks)
        })
   

    res.send("ok")   
    return null
}
