import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { View } from "./View";
import { Loading } from "../loading/Loading";

export const MainPage = () => {
    const { token, logout } = useContext(AuthContext);
    const [ form, setForm ] = useState({ text: '', amount: '' });
    const [ expenses, setExpenses ] = useState([]);
    const [ expenseByMonth, setExpenseByMonth ] = useState([]);
    const [ balance, setBalance ] = useState(0);
    const [ warning, setWarning ] = useState('');
    const { request , loading } = useHttp();
    const history = useHistory();

    const fetchExpenses = useCallback(async () => {
        const { expenses, balance, monthExpenses, message } = await request('/expenses', 'GET', null, {
            Authorization: `Bearer ${token}`
        });
        if (message === 'No authorization') {
            logout();
            history.push('/');
            return;
        }
        setExpenseByMonth(monthExpenses);
        setExpenses(expenses);
        setBalance(balance);
    }, [token, request, logout, history]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const addHandler = async () => {
        if (warning) {
            setWarning('');
        }
        if (!(form.text.length < 30 && !isNaN(Number(form.amount)) && form.amount && form.text)) {
            return setWarning('Incorrect input');
        }
        try {
            await request('/expenses/add', 'POST', { ...form }, {
                Authorization: `Bearer ${token}`
            });
            setForm({ text: '', amount: '' });
            fetchExpenses();
        } catch (error) {}
    };

    if (loading) {
        return <Loading />
    }

    return (
        <>
            { !loading &&
                <View
                    warning={warning}
                    form={form}
                    changeHandler={changeHandler}
                    addHandler={addHandler}
                    expenses={expenses}
                    balance={balance}
                    expenseByMonth={expenseByMonth}
                />
            }
        </>
    );
};