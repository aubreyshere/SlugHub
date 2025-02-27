const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Timestamp } = require('firebase-admin/firestore');  
const { db } = require('./firebaseAdminSetup');  
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); 
app.use(cors({ origin: '*', credentials: true })); 
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('meow');
});

// Create Event
app.post('/create-event', async (req, res) => {
    const { title, description, photo, date, startTime, endTime, location, user_id } = req.body;

    // Validate required fields
    if (!title || !description || !date || !location || !user_id) {
        return res.status(400).json({ message: 'Required fields missing!' });
    }

    try {
        const eventData = {
            title,
            description,
            photo: photo || null, 
            date,
            startTime: startTime || null, 
            endTime: endTime || null, 
            location,
            created_at: Timestamp.fromDate(new Date()), 
            user_id,
        };

        const docRef = await db.collection('events').add(eventData);
        console.log('New event created successfully with ID:', docRef.id);
        return res.status(201).json({ message: 'Event created successfully', eventId: docRef.id });
    } catch (err) {
        console.error('Error creating event:', err);
        return res.status(500).json({ message: 'Failed to create event' });
    }
});

// Get Event by ID
app.get('/event/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const eventDoc = await db.collection('events').doc(eventId).get();

        if (!eventDoc.exists) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const eventData = eventDoc.data();
        return res.json({ id: eventDoc.id, ...eventData }); // Include document ID in response
    } catch (err) {
        console.error('Error fetching event:', err);
        return res.status(500).json({ message: 'Failed to fetch event' });
    }
});

// Get All Events
app.get('/events', async (req, res) => {
    try {
        const eventsSnapshot = await db.collection('events').get();

        if (eventsSnapshot.empty) {
            return res.status(404).json({ message: 'No events available' });
        }

        const events = [];
        eventsSnapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() }); // Include document ID in response
        });

        return res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        return res.status(500).json({ message: 'Failed to fetch events' });
    }
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long!' });
    }

    try {
        const emailSnapshot = await db.collection('users').where('email', '==', email).get();
        if (!emailSnapshot.empty) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username,
            email,
            password: hashedPassword,
            created_at: Timestamp.fromDate(new Date()), 
        };

        const docRef = await db.collection('users').add(userData);
        console.log('New user created successfully with ID:', docRef.id);
        return res.status(201).json({ message: 'User created successfully', userId: docRef.id });
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
});

// Signin Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const usersSnapshot = await db.collection('users').where('email', '==', email).get();

        if (usersSnapshot.empty) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const userDoc = usersSnapshot.docs[0];
        const userData = userDoc.data();

        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        return res.json({ message: 'Login successful.', userId: userDoc.id });
    } catch (err) {
        console.error('Error during signin:', err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});