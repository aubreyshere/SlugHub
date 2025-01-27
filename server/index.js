const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'sluggyhub',
});

const bcrypt = require('bcrypt');

app.post('/users', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal server error." });
        }
        if (data.length > 0) {
            const user = data[0];
            // Compare hashed password
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    return res.json({ message: "Login successful." });
                } else {
                    return res.status(401).json({ message: "Invalid credentials." });
                }
            });
        } else {
            return res.status(401).json({ message: "Invalid credentials." });
        }
    });
});

app.get('/', (req, res) => {
    return res.json("From server side");
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
