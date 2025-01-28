const bcrypt = require('bcrypt');
const mysql = require('mysql');
// this code is for creating accounts
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '15644651!Ah', 
    database: 'sluggyhub', 
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database');
    
    const username = 'newuser';  // Example username
    const email = 'newuser@example.com';  // Example email
    const plainPassword = 'newpassword';  // Example plain text password
    
    // Hash the password using bcrypt
    bcrypt.hash(plainPassword, 10, function(err, hashedPassword) {
        if (err) {
            console.error('Error hashing password: ', err);
            return;
        }
        
        // Insert the new user with the hashed password into the database
        const createdAt = new Date();  

        const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)';
        db.query(query, [username, email, hashedPassword, createdAt], (err, result) => {
            if (err) {
                console.error('Error inserting user into database: ', err);
            } else {
                console.log('New user created successfully!');
            }
            db.end();  // Close the database connection
        });
    });
});
