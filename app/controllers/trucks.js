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
     truck.date=Date.now()
     
     if (params.temporality) truck.temporality = params.temporality
     if (params.location) truck.location = params.location
     if (params.validity) truck.validity = params.validity
     truck.version++
     var id = params.id
     Feed
         .findOne({_id : id})
         .exec(function (err, tweet) {
             if (err) throw err
             if (tweet) {
                tweet.username = user 
                tweet.version = truck.version
                truck.tweets.push(tweet)        
             }
             truck.save()
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
    
    res.send("ok")   
    return null
}
