const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt'); // For password hashing

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample data storage
let data = {
    totalVisitors: 0,
    totalSubscribers: 0,
    subscribers: [],
    users: [], // Store registered users
    feedback: [] // Store feedback messages
};

// Load existing data from JSON file if it exists
if (fs.existsSync('data.json')) {
    data = JSON.parse(fs.readFileSync('data.json'));
}

app.get('/api/stats', (req, res) => {
    data.totalVisitors++; // Increment visitor count
    res.json(data);
});

// Endpoint to register a new user
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
        data.users.push({ email, password: hashedPassword });
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Email and password are required' });
    }
});

// Endpoint to login a user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = data.users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

// Endpoint to update user profile
app.post('/api/update-profile', (req, res) => {
    const { email, password } = req.body;
    const user = data.users.find(u => u.email === email);
    if (user) {
        if (password) {
            user.password = bcrypt.hashSync(password, 10); // Update password
        }
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.status(200).json({ message: 'Profile updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Endpoint to subscribe to newsletter
app.post('/api/subscribe-newsletter', (req, res) => {
    const { email } = req.body;
    if (email) {
        data.subscribers.push({ email, date: new Date().toISOString() });
        data.totalSubscribers++;
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.status(201).json({ message: 'Subscribed to newsletter successfully' });
    } else {
        res.status(400).json({ message: 'Email is required' });
    }
});

// Endpoint to submit feedback
app.post('/api/feedback', (req, res) => {
    const { email, message } = req.body;
    if (email && message) {
        data.feedback.push({ email, message, date: new Date().toISOString() });
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } else {
        res.status(400).json({ message: 'Email and message are required' });
    }
});

// Endpoint to get user list for admin
app.get('/api/users', (req, res) => {
    res.json(data.users);
});

// Endpoint to delete a user
app.delete('/api/delete-user', (req, res) => {
    const { email } = req.body;
    data.users = data.users.filter(user => user.email !== email);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.status(200).json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
