const admin = require('firebase-admin');
const serviceAccount = require('../config/slughubbing-firebase-adminsdk-fbsvc-1528ce31d6.json');

// Initialize Firebase Admin with the service account credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://slughubbing.firebaseio.com' // Optional, add if needed
});

const db = admin.firestore();

module.exports = { db };

