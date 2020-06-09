import React, {useCallback, useContext, useEffect, useState} from "react";
import { useHttp } from "../../hooks/http.hook";
import { Loading } from "../loading/Loading";
import { View } from "./View";
import { AuthContext } from "../../context/AuthContext";

export const HistoryPage = () => {
    const { token } = useContext(AuthContext);
    const [ expenses, setExpenses ] = useState([]);
    const { loading, request } = useHttp();

    const fetchExpenses = useCallback(async () => {
        try {
            const { expenses } = await request('/expenses/history', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setExpenses(expenses);
        } catch (error) {}
    }, [token, request]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            { !loading &&
                <View expenses={expenses} />
            }
        </>
    );
};