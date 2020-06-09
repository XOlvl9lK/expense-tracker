const PORT = process.env.PORT || 80;
const MONGODB_URI = 'mongodb://heroku_tv1msxfs:qp47q2sjvk7n8o3br9taaoohnb@ds061076.mlab.com:61076/heroku_tv1msxfs';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json({ extended: true }));

server.use('/auth', require('./routes/auth.routes'));
server.use('/expenses', require('./routes/expense.routes'));

server.use('/', express.static(path.join(__dirname, 'client', 'build')));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

async function runServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
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
