const express = require('express');

const html = require('./routes/htmlRoutes.js');
const api = require('./routes/apiRoutes.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.use('/api', api);
// when navigating to homepage, show index.html
app.use('/', html);

// console log when user hits server route
app.listen(PORT, () => {
    console.log(`HTML IS DONE`);
});