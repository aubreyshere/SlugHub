const admin = require('firebase-admin');
const serviceAccount = require('../config/slughubbing-firebase-adminsdk-fbsvc-2c2cf2dc22.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { db };

