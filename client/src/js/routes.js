import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthPage } from "./components/authPage/AuthPage";
import { MainPage } from "./components/mainPage/MainPage";
import { HistoryPage } from "./components/historyPage/HistoryPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/main" component={MainPage} />
                <Route path="/history" component={HistoryPage} />
                <Route path="*" component={MainPage} />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path="*" component={AuthPage} />
        </Switch>
    );
};