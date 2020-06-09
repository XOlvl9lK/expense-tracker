import React from "react";

export const Registration = ({ registerForm, changeHandler, registerHandler, loading }) => {

    return (
        <div className="registration">
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={registerForm.email}
                onChange={changeHandler}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={registerForm.password}
                onChange={changeHandler}
            />
            <input
                type="password"
                placeholder="Repeat Password"
                name="confirmPassword"
                value={registerForm.confirmPassword}
                onChange={changeHandler}
            />
            <button
                id="registration-blur"
                onClick={registerHandler}
                disabled={loading}
            >
                &#9658;
            </button>
        </div>
    );
};