const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Timestamp } = require('firebase-admin/firestore');
const { db } = require('./firebaseAdminSetup');
const jwt = require('jsonwebtoken');
const { Firestore } = require('firebase-admin/firestore');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');

require('dotenv').config();


const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const SECRET_KEY = process.env.JWT_SECRET; 


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

app.use(express.json());


app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.send('meow');
});

// tracks sign in
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }
        req.user = user; 
        next();
    });
};

// Create Event
app.post('/create-event', authenticateToken, upload.single('photo'), async (req, res) => {
  const { title, description, date, startTime, endTime, location } = req.body;
  const user_id = req.user.userId;

  const MAX_TITLE_LENGTH = 100;
  const MAX_DESCRIPTION_LENGTH = 500;
  const MAX_LOCATION_LENGTH = 100;

  if (!title || !description || !date || !location) {
    return res.status(400).json({ message: 'Required fields missing!' });
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return res.status(400).json({ message: `Title exceeds ${MAX_TITLE_LENGTH} characters.` });
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    return res.status(400).json({ message: `Description exceeds ${MAX_DESCRIPTION_LENGTH} characters.` });
  }
  if (location.length > MAX_LOCATION_LENGTH) {
    return res.status(400).json({ message: `Location exceeds ${MAX_LOCATION_LENGTH} characters.` });
  }

  let photoBase64 = null;
  if (req.file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Only JPEG, PNG, or WebP images are allowed.' });
    }

    photoBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }
  try {
    const eventData = {
      title,
      description,
      photo: photoBase64,
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



// get user by id
app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log('Fetching user with ID:', userId); 

    try {
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            console.log('User not found for ID:', userId); 
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userDoc.data();
        console.log('User data:', userData); 
        return res.json({ id: userDoc.id, ...userData });
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Failed to fetch user' });
    }
});

// Get Event by ID
app.get('/event/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
    console.log('Received eventId:', eventId); // Log the eventId

    try {
        const eventDoc = await db.collection('events').doc(eventId).get();

        if (!eventDoc.exists) {
            console.log('Event not found for eventId:', eventId); // Log if event not found
            return res.status(404).json({ message: 'Event not found' });
        }

        const eventData = eventDoc.data();
        console.log('Event data:', eventData); // Log the event data
        return res.json({ id: eventDoc.id, ...eventData });
    } catch (err) {
        console.error('Error fetching event:', err);
        return res.status(500).json({ message: 'Failed to fetch event' });
    }
});

// sign in
app.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
      const usersSnapshot = await db.collection('users').where('email', '==', email).get();

      if (usersSnapshot.empty) {
        return res.status(401).json({ message: 'Email not found.' });
      }

      const userDoc = usersSnapshot.docs[0];
      const userData = userDoc.data();

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      // 🔐 Check if email is verified
      if (!userData.emailVerified) {
        return res.status(403).json({ message: 'Please verify your email before logging in.' });
      }

      const token = jwt.sign({ userId: userDoc.id }, SECRET_KEY, { expiresIn: '1h' });

      return res.json({
        message: 'Login successful.',
        token,
        userId: userDoc.id,
      });
    } catch (err) {
      
      console.error('Error during signin:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
);


// Signup Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long!' });
  }

  try {
    console.log('Checking for existing user...');
    const emailSnapshot = await db.collection('users').where('email', '==', email).get();

    if (!emailSnapshot.empty) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    console.log('Hashing password...');
    console.log(process.env.EMAIL_USER);  // Should print your Gmail address
    console.log(process.env.EMAIL_PASS);  // Should print the app password

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const userData = {
      username,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      created_at: Timestamp.fromDate(new Date()),
    };

    console.log('Creating user document...');
    const docRef = await db.collection('users').add(userData);

    const verificationLink = `http://localhost:4000/verify-email?token=${verificationToken}`;
    console.log('Sending verification email to:', email);

    await transporter.sendMail({
      from: `"SlugHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Please verify your email',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    return res.status(201).json({ message: 'Signup successful. Please check your email to verify your account.' });
  } catch (err) {
    console.error('Error during signup:', err);
    return res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
});


// verify email
app.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const usersSnapshot = await db.collection('users').where('verificationToken', '==', token).get();

    if (usersSnapshot.empty) {
      return res.status(400).send('Invalid or expired verification link.');
    }

    const userDoc = usersSnapshot.docs[0];
    await userDoc.ref.update({
      emailVerified: true,
      verificationToken: null,
    });

    res.send('Email verified successfully! You can now log in.');
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).send('Internal server error');
  }
});

// recommended page
app.get('/events', async (req, res) => {
  const limit = parseInt(req.query.limit) || 12;
  const lastDate = req.query.lastDate; 

  try {
      let query = db.collection('events')
          .orderBy('date')
          .limit(limit);

      if (lastDate) {
          const lastDateSnapshot = await db.collection('events').doc(lastDate).get();
          query = query.startAfter(lastDateSnapshot);
      }

      const eventsSnapshot = await query.get();

      const events = [];
      eventsSnapshot.forEach((doc) => {
          events.push({
              id: doc.id,
              ...doc.data(),
              date: doc.data().date.toDate ? doc.data().date.toDate() : doc.data().date
          });
      });

      return res.status(200).json(events);
  } catch (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ 
          message: 'Internal server error.',
          error: err.message 
      });
  }
});

// search feature
app.get('/search', async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    const eventsRef = db.collection('events');
    const snapshot = await eventsRef.get();

    if (snapshot.empty) {
      return res.status(200).json({ message: 'No events found', events: [] }); // Return 200 with empty array
    }

    const searchTerm = q.toLowerCase();
    const events = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const titleMatch = data.title?.toLowerCase().includes(searchTerm);
      const descMatch = data.description?.toLowerCase().includes(searchTerm);

      if (titleMatch || descMatch) {
        events.push({
          id: doc.id,
          ...data,
        });
      }
    });

    if (events.length === 0) {
      return res.status(200).json({ message: 'No matching events found', events: [] }); // Return 200 with empty array
    }

    return res.status(200).json(events);
  } catch (err) {
    console.error('Error searching events:', err);
    return res.status(500).json({ message: 'Failed to search events' });
  }
});

  //get user info
  app.get('/api/user', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const userDoc = await db.collection('users').doc(userId).get();
  
      if (!userDoc.exists) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userData = userDoc.data();
      res.json({ username: userData.username, email: userData.email });
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/user/events', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId; 
  
      const eventsSnapshot = await db.collection('events')
        .where('user_id', '==', userId)
        .get();
  
      const events = [];
      eventsSnapshot.forEach((doc) => {
        events.push({
          id: doc.id,
          ...doc.data(),
        });
      });
  
      res.json(events); 
    } catch (err) {
      console.error('Error fetching user events:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// reset password
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'No user with this email.' });
    }

    const userDoc = userSnapshot.docs[0];
    const resetToken = crypto.randomBytes(32).toString('hex');

    await userDoc.ref.update({
      resetToken,
      resetTokenExpires: Timestamp.fromDate(new Date(Date.now() + 3600 * 1000)) // 1 hour
    });

    const resetLink = `http://localhost:3000/forgot-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"SlugHub" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
    });

    return res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Error in forgot-password:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});


const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});