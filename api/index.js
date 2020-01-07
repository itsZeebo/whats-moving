const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
elasticProvider = require('./Providers/ElasticsearchProvider');

const uploadFilesRouter = require('./Routes/uploadFilesRouter');

const port = process.env.PORT || 3005;

const app = express();

app.use(cors());
app.use(bodyParser.json());

elasticProvider.connect();

// routes for upload service: 
app.use('/uploadFile', uploadFilesRouter);

// isAlive route:
app.get('/isAlive', (req, res) => {
    res.send(true);
});


app.listen(port, () => console.log(`app listening on port ${port}!`));