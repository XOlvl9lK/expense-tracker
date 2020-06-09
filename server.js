const PORT = '8080';
const MONGODB_URI = 'mongodb+srv://denis:1234qwer@cluster0-xiwz2.azure.mongodb.net/expense-tracker?retryWrites=true&w=majority';

const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(express.json({ extended: true }));

server.use('/auth', require('./routes/auth.routes'));
server.use('/expenses', require('./routes/expense.routes'));

async function runServer() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        server.listen(PORT, () => {
            console.log(`Server on port ${PORT} has been available...`);

        });
    } catch (error) {
        console.log('Server error ', error.message);
        process.exit(1);
    }
}

runServer();
