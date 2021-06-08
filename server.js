const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;

server.use(express.static(path.join(__dirname + '/dist')));

server.use('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

server.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});
