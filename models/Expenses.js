const { Schema, model, Types } = require('mongoose');

const expensesSchema = new Schema({
    amount: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    owner: { type: Types.ObjectId, ref: 'User' }
});

module.exports = model('Expenses', expensesSchema);