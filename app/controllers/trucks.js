var mongoose = require('mongoose')
    , Truck = mongoose.model('Truck')

exports.get = function (req, res) {
    Truck
        .find({})
        .exec(function (err, trucks) {
            if (err) throw err
            if (trucks) res.json(trucks)
        })
}

exports.post = function (req, res) {
console.log("HERE")
res.send("HEY")
    /*
    var truck = new Truck()
    if (!req.truckName) return null
    
    Truck
        .find({truckName: req.truckName})
    
    if (req.truckName) truck.truckName = req.truckName
    if (req.temporality) truck.temporality = req.temporality 
    if (req.time) truck.removeAttributeNode(
    if (req.location)
    if (req.id)
    
    //add validity...
    res.send("not implemented")
*/
}
