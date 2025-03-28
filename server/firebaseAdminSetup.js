const admin = require('firebase-admin');
const serviceAccount = require('../config/slughubbing-firebase-adminsdk-fbsvc-91d737d499.json');

// Initialize Firebase Admin with the service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://slughubbing.firebaseio.com' // Optional, add if needed
});

const db = admin.firestore();

module.exports = { db };

