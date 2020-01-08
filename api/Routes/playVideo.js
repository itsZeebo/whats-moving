const fs = require("fs");
const express = require('express');
const route = express.Router();

route.get(`/:id`, (req, res) => {
    const fullPath = `uploads/${req.params.id}`;

    const head = {
        'Content-Type': 'video/mp4',
    }

    res.writeHead(200, head)
    fs.createReadStream(fullPath).pipe(res)
});

module.exports = route; 