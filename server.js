const express = require('express');
const path = require('path');

const app = expres();

app.use(express.static(__dirname + '/dist/rb-front-angular'));

//PathLocationStradegy
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/rb-front-angular/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Console Listening');
});