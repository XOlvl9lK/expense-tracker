const PORT = process.env.PORT || 80;
const MONGODB_URI = 'mongodb+srv://user:user@cluster0.ez07i.mongodb.net/expense-tracker?retryWrites=true&w=majority';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes')
const expenseRouter = require('./routes/expense.routes')

const server = express();
server.use(express.json({ extended: true }));

server.use('/auth', authRouter);
server.use('/expenses', expenseRouter);

server.use('/', express.static(path.join(__dirname, 'client', 'build')));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

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
