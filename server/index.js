const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const app = express();

app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

const db = mysql.createConnection({ // local database, only works on my computer unless you set up your own and change info
    host: "localhost",
    user: "root",
    password: '15644651!Ah',
    database: 'sluggyhub',
});
// testing backend
app.get('/', (req, res) => {
    res.send('meow');
});

// creating event
app.post('/create-event', (req, res) => {
    const { title, description, photo, date, startTime, endTime, location, user_id } = req.body;

    const createdAt = new Date();
    console.log('Reached create event');

    if (!title || !description || !date || !location || !user_id) {
        return res.status(400).json({ message: 'Required fields missing!' });
    }

    const query = `
        INSERT INTO events 
        (title, description, photo, date, startTime, endTime, location, created_at, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query, 
        [title, description, photo, date, startTime, endTime, location, createdAt, user_id], 
        (err, result) => {
            if (err) {
                console.error('Error creating event: ', err);
                return res.status(500).json({ message: 'Failed to create event' });
            }
            console.log('New event created successfully!');
            return res.status(201).json({ message: 'Event created successfully' });
        }
    );
});

// return event data
app.get('/event/:eventId', (req, res) => {
    let { eventId } = req.params;
    eventId = parseInt(eventId, 20);  // Convert eventId to an integer

    console.log('Received eventId:', eventId);  // Log eventId

    const query = 'SELECT * FROM events WHERE id = ?';

    db.query(query, [eventId], (err, result) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ message: 'Failed to fetch event' });
        }

        if (result.length === 0) {
            console.log('Event not found with id:', eventId);
            return res.status(404).json({ message: 'Event not found' });
        }

        console.log('Event found:', result[0]);
        return res.json(result[0]);
    });
});



// Signup Route
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    const createdAt = new Date();
    console.log('Reached signup');

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long!' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, createdAt], (err, result) => {
            if (err) {
                console.error('Error creating account: ', err);
                return res.status(500).json({ message: 'Failed to create account' });
            }
            console.log('New user created successfully!');
            return res.status(201).json({ message: 'User created successfully' });
        });
    });
});
//Signin route
app.post('/users', (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const cleanedEmail = email.trim().toLowerCase();  // Clean the email and make it lowercase
    const cleanedPassword = password.trim();  // Clean the password

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [cleanedEmail], (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: "Internal server error." });
        }
        if (data.length > 0) {
            const user = data[0];

            // Compare hashed password
            bcrypt.compare(cleanedPassword, user.password, (err, result) => {
                if (err) {
                    console.error('bcrypt error:', err);
                    return res.status(500).json({ message: "Internal server error." });
                }
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

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
