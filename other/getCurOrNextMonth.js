function getCurOrNextMonth(state) {
    const month = new Date();

    if (state === 'current') {
        month.setDate(1);

    } else if (state === 'next') {
        month.setDate(31);

        if (month.getDate() === new Date(2020, 0, 1).getDate()) {
            month.setMonth(month.getMonth() - 1);
            month.setDate(30);
        } else if (month.getDate() === new Date(2020, 0, 2).getDate() || month.getDate() === new Date(2020, 1, 3).getDate()) {
            month.setMonth(month.getMonth() - 1);
            month.setDate(28);
        }
    }

    return month;
}

module.exports = getCurOrNextMonth;