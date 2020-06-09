import React from "react";

export const Login = ({ loginForm, changeHandler, loading, loginHandler, keepLogged, checkboxHandler }) => {

    return (
        <div>
            <div className="login">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={loginForm.email}
                    onChange={event => changeHandler(event, 'login')}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={event => changeHandler(event, 'login')}
                />
                <button
                    id="login-blur"
                    onClick={loginHandler}
                    disabled={loading}
                >
                    &#9658;
                </button>

            </div>
            <div className="check">
                <input type="checkbox" checked={keepLogged} onChange={checkboxHandler}/>
                <p>Keep me logged in</p>
            </div>
        </div>
    );
};