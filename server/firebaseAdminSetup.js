const admin = require('firebase-admin');
const serviceAccount = require('../config/-insertkey-');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };