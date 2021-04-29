const express = require('express');
const path = require('path');

const server = express();
const PORT = 4000;

server.use(express.static(path.join(__dirname + '/build')));

server.use('/*', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
})

// server.use(function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

server.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});