var mongoose = require('mongoose')
let pw = "4PqbKvziOyxiClGI"
let uri = "mongodb+srv://chair:"+pw+"@cluster0-kykmw.mongodb.net/amazon?retryWrites=true"
mongoose.connect(uri)

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
    ratingCount : Number,
    prime : Boolean,
    imgUrl : String,
    relevantItems: [],
    boughtTogether: []
})
var itemModel = mongoose.model('Item', itemSchema)

module.exports.db = {
    model : itemModel,
    connection : db
};