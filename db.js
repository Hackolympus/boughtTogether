var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/amazon')

var db = mongoose.connection()

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('mongoose')    
});

var itemSchema = new mongoose.schema({
    title : String,
    author : String,
    bookType : String,
    price : String,
    rating : Number,
    prime : Boolean,
    imgUrl : String,
    relevantItems: [String],
    boughtTogether: [String]
})
var item = mongoose.model('Item', itemSchema)

module.export.db = {
    model : item,
    connection : db
};