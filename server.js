const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, ()=> {
    console.log('hello from ' + port)
})