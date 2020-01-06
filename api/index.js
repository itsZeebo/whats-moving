const express = require('express'),
bodyParser = require('body-parser');

const uploadFilesRouter = require('./Routes/uploadFilesRouter');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// routes for upload service: 
app.use('/uploadFile', uploadFilesRouter);

// isAlive route:
app.get('/isAlive', (req, res) => {
    res.send(true);
});


app.listen(port, () => console.log(`app listening on port ${port}!`));