const express = require('express');
const path = require("path")
const morgan = require('morgan');
const { urlencoded } = require('express');
const db = require('./config/db');
const route = require('./routes')

const app = express();
const port = 3000;

app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, 'public')))

db.connect()

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());


route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
