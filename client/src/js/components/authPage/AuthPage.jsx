import React, { useContext, useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import { Error } from "../error/Error";

export const AuthPage = () => {
    const [ login, setLogin ] = useState(true);
    const [ registration, setRegistration ] = useState(false);
    const [ loginForm, setLoginForm ] = useState({ email: '', password: '' });
    const [ registerForm, setRegisterForm ] = useState({ email: '', password: '', confirmPassword: '' });
    const [ keepLogged, setKeepLogged ] = useState(false);
    const { loading, error, request, clearError, setError } = useHttp();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                clearError();
            }, 3000);
        }
    }, [error, clearError]);

    const choiceHandler = (event, choice) => {
        if (choice === 'login') {
            setRegistration(false);
            setTimeout(() => setLogin(true), 200);
        } else if (choice === 'registration') {
            setLogin(false);
            setTimeout(() => setRegistration(true), 200);
        }
    };

    const changeHandler = (event, type) => {
        if (type === 'login') {
            setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
        } else {
            setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });
        }
    };

    const registerHandler = async () => {
        let registerFormToSend = { ...registerForm };
        registerFormToSend.email = registerFormToSend.email.toLowerCase();
        try {
            const data = await request('/auth/register', 'POST', { ...registerFormToSend });
            setError(data.message);
            if (data.message === 'User was created') {
                choiceHandler(null, 'login');
            }
        } catch (e) {}
    };

    const loginHandler = async () => {
        let loginFormToSend = { ...loginForm };
        loginFormToSend.email = loginFormToSend.email.toLowerCase();
        try {
            const data = await request('/auth/login', 'POST', { ...loginFormToSend, keepLogged });
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    const checkboxHandler = () => {
        setKeepLogged(!keepLogged);
    };

    return (
        <div className="auth-page">
            <h1>Welcome to Expense Tracker </h1>
            <hr/>
            <div className="buttons">
                <button onClick={event => choiceHandler(event, 'login')}>
                    <span />
                    <span />
                    <span />
                    <span />
                    Login
                </button>
                <button onClick={event => choiceHandler(event, 'registration')}>
                    <span />
                    <span />
                    <span />
                    <span />
                    Registration
                </button>
            </div>
            <TransitionGroup>
                { login &&
                    <CSSTransition classNames="swipe-login" timeout={200}>
                        <Login
                            loginForm={loginForm}
                            changeHandler={changeHandler}
                            loading={loading}
                            loginHandler={loginHandler}
                            keepLogged={keepLogged}
                            checkboxHandler={checkboxHandler}
                        />
                    </CSSTransition>
                }

                { registration &&
                    <CSSTransition classNames="swipe-registration" timeout={200}>
                        <Registration
                            registerForm={registerForm}
                            changeHandler={changeHandler}
                            loading={loading}
                            registerHandler={registerHandler}
                        />
                    </CSSTransition>
                }

                {error &&
                <CSSTransition classNames="pushup" timeout={500}>
                    <Error message={error}/>
                </CSSTransition>
                }
            </TransitionGroup>
        </div>
    )
};