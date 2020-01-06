const express = require('express');

const testService = require('./Service/testService');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/testRoute/:bool', (req, res) => {
    let bool = req.params.bool;
    testService.test(bool)
    .then(result => {
        console.log('test succeed'); 
        res.send(result);
    })
    .catch(err => {
        console.log('ERROR occured');
        res.status(500).send(err); 
    });
});



app.listen(port, () => console.log(`app listening on port ${port}!`));