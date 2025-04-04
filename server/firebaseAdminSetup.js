const admin = require('firebase-admin');
const serviceAccount = require('../config/slughubbing-firebase-adminsdk-fbsvc-1a07519764.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };