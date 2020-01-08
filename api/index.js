const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
elasticProvider = require('./Utilities/ElasticsearchProvider');

const uploadFilesRouter = require('./Routes/uploadFilesRouter'),
    elasticRouter = require('./Routes/elasticRouter');

const port = process.env.PORT || 3005;

const app = express();

app.use(cors());
app.use(bodyParser.json());

elasticProvider.connect();

// routes for upload service: 
app.use('/uploadFile', uploadFilesRouter);

// routes for elastic: 
app.use('/', elasticRouter);

// isAlive route:
app.get('/isAlive', (req, res) => {
    res.send(true);
});


app.listen(port, () => console.log(`app listening on port ${port}!`));