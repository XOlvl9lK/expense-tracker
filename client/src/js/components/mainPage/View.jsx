import React, { useEffect, useState } from "react";

export const View = ({
                         form,
                         changeHandler,
                         addHandler,
                         warning,
                         expenses,
                         balance,
                         expenseByMonth
}) => {
    const [ income, setIncome ] = useState(0);
    const [ expense, setExpense ] = useState(0);

    useEffect(() => {
        setIncome(0);
        setExpense(0);
        if (expenseByMonth.length) {
            for (let i = 0; i < expenseByMonth.length; i++) {
                if (Number(expenseByMonth[i].amount) >=  0) {
                    setIncome(prevState => prevState += Number(expenseByMonth[i].amount));
                } else if (Number(expenseByMonth[i].amount) <  0) {
                    setExpense(prevState => prevState += Number(expenseByMonth[i].amount));
                }
            }
        }
    }, [expenseByMonth]);


    let lastTransactions = [];
    if (expenses.length) {
        for (let i = 0; i < expenses.length; i++) {
            if (i < 0) {
                break;
            }
            if (Number(expenses[i].amount) > 0) {
                lastTransactions.push(
                    <p key={expenses[i].date}>
                        <span>
                            {new Date(expenses[i].date).toLocaleDateString()}
                            <span className="text-splitter" />
                            {expenses[i].text}
                        </span>
                        <span>{expenses[i].amount}</span>
                        <span className="positive"/>
                    </p>
                );
            } else {
                lastTransactions.push(
                    <p key={expenses[i].date}>
                        <span>
                            {new Date(expenses[i].date).toLocaleDateString()}
                            <span className="text-splitter" />
                            {expenses[i].text}
                        </span>
                        <span>{expenses[i].amount}</span>
                        <span className="negative" />
                    </p>
                );
            }
        }
    }

    return (
        <div className="main-page-wrap">
            <div className="main-page">
                <h2 className="title">Expense Tracker</h2>
                <hr/>
                <div className="balance">
                    <h3>YOUR BALANCE</h3>
                    <p>&#8381;{balance}</p>
                </div>

                <div className="month">
                    <p className="by-month">Statistics for the month</p>
                    <div className="income">
                        <h3>INCOME</h3>
                        <p className="">&#8381;{income}</p>
                    </div>
                    <div className="expense">
                        <h3>EXPENSE</h3>
                        <p>&#8381;{Math.abs(expense)}</p>
                    </div>
                </div>

                <div className="last-transactions">
                    <h3>Last Transactions</h3>
                    <hr/>
                    { lastTransactions.length ? lastTransactions : <p className="plug">No transactions for now</p> }
                </div>

                <div className="new-transaction">
                    <h3>Add New Transaction</h3>
                    <hr/>
                    <p className="text">Text</p>
                    <input
                        type="text"
                        placeholder="Enter text..."
                        name="text"
                        value={form.text}
                        onChange={changeHandler}
                        autoComplete="off"
                    />
                    <p className="amount">Amount</p>
                    <p>(negative - expense, positive - income)</p>
                    <input
                        type="text"
                        placeholder="Amount..."
                        name="amount"
                        value={form.amount}
                        onChange={changeHandler}
                        autoComplete="off"
                    />
                    { warning && <p className="warning">{warning}</p>}
                    <button onClick={addHandler}>
                        <span />
                        <span />
                        <span />
                        <span />
                        Add Transaction
                    </button>
                </div>
            </div>
        </div>
    );
};