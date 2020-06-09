const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    expenses: [{ type: Types.ObjectId, ref: 'Expenses' }]
});

module.exports = model('User', userSchema);