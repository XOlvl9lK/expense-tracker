import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from "../routes";
import { AuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/auth.hook";
import { Navbar } from "./navbar/Navbar";

function App() {
    const { token, login, logout, userId } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId
        }}>
            <BrowserRouter>
                <div className="container">
                    {routes}
                    { isAuthenticated && <Navbar /> }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
