var mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect('mongodb://localhost/amazon')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose')    
});

var itemSchema = new mongoose.Schema({
    id : Number,
    title : String,
    author : String,
    bookType : String,
    priceDollars : Number,
    priceCents : Number,
    price : Number,
    rating : Number,
    prime : Boolean,
    imgUrl : String,
    relevantItems: [{type: ObjectId, ref: 'Item'}],
    boughtTogether: [{type: ObjectId, ref: 'Item'}]
})
var itemModel = mongoose.model('Item', itemSchema)

module.exports.db = {
    model : itemModel,
    connection : db
};