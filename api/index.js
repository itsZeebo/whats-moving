const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors');

const uploadFilesRouter = require('./Routes/uploadFilesRouter');

const port = process.env.PORT || 3005;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes for upload service: 
app.use('/uploadFile', uploadFilesRouter);

// isAlive route:
app.get('/isAlive', (req, res) => {
    res.send(true);
});


app.listen(port, () => console.log(`app listening on port ${port}!`));