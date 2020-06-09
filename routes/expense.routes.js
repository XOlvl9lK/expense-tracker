const { Router } = require('express');
const shortid = require('short-id');
const auth = require('../middleware/auth.middleware');
const Expenses = require('../models/Expenses');
const User = require('../models/User');
const getCurOrNextMonth = require('../other/getCurOrNextMonth');
const router = Router();

router.post('/add', auth, async (req, res) => {
    try {
        const { text, amount } = req.body;

        const expense = new Expenses({
            text, amount, owner: req.user.userId
        });

        const user = await User.findOne({ _id: req.user.userId });
        user.balance += Number(amount);
        await user.save();

        expense.save();

        res.status(201).json({ expense });
    } catch (error) {
        res.status(500).json({ message: 'Something goes wrong '});
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expenses.find({ owner: req.user.userId }).sort({ $natural: -1 }).limit(3);

        const { balance } = await User.findOne({ _id: req.user.userId });

        const currentMonth = getCurOrNextMonth('current');
        const nextMonth = getCurOrNextMonth('next');

        const monthExpenses = await Expenses.find({
            owner: req.user.userId,
            date: { $gte: currentMonth, $lte: nextMonth }
        });

        // console.log(monthExpenses);

        // if (!monthExpenses) {
        //     return res.status(200).json({ expenses, balance, monthExpenses: [] });
        // }

        res.status(200).json({ expenses, balance, monthExpenses });
    } catch (error) {
        res.status(500).json({ message: 'Something goes wrong '});
    }
});


router.get('/history', auth, async (req, res) => {
    try {
        const expenses = await Expenses.find({ owner: req.user.userId }).sort({ $natural: -1 });

        res.status(200).json({ expenses });
    } catch (error) {
        res.status(500).json({ message: 'Something goes wrong' });
    }
});

module.exports = router;
