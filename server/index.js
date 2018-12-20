const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const app = express();
const port = 3015;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')))



app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, ()=> {
    console.log('hello from ' + port)
})

module.exports = app;