var mongoose = require('mongoose')
  , Schema = mongoose.Schema

//Non-Temporal
var Truck = new Schema({
    
    truckName:  {type:String, default:''},
    date:       {type:Date,   default:Date.now()},
    temporality:{type:String, default:'today'}, //or valid 'always'
    location:   {type:String, default:''}, 
    //Is it "valid" or "invalid", if someone goes and its not there they can mark invalid
    validity:   {type:String, default:''}, //"valid", "invalid", "unknown"
    version:    {type: Number, default:''},   //how many prior tags
    //supporting evidence
    tweets: [{
        username:   {type: String, default:''},//who tagged it
        version:    {type: Number, default:''},   //how many prior tags
        screen_name:{type: String, default:''}, 
        content:    {type: String, default:''},
        geo:        {type: String, default:''},
        datePosted: {type: Date,   default:Date.now()},
        avatar:     {type: String, default:''}
    }]
})

//Temporal
var Feed = new Schema({
    dateRequested: {type: Date, default: Date.now()},
    tweets: [{
        screen_name:{type: String, default:''},
        content:    {type: String, default:''},
        geo:        {type: String, default:''},
        datePosted: {type: Date, default:Date.now()},
        avatar: {type: String, default:''}
    }]
})

mongoose.model('Truck', Truck)
mongoose.model('Feed', Feed)
