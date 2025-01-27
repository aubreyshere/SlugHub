const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

const db = mysql.createConnection({
    host: "losthost",
    user: "root",
    password: '',
    database: '',
});

app.get('/', (req, res) => {
    return res.json("From server side");
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
