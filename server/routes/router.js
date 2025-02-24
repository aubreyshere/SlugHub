const express = require('express');
const router = express.Router();


router.get('/users', (req, res) => {
    res.json({ message: "Users route accessed" });
});

router.get('/signup', (req, res) => {
    res.json({ message: "signup route accessed" });
});

router.get('/create-event', (req, res) => {
    res.json({ message: "create-event route accessed" });
});


module.exports = router;