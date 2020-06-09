import React from 'react';

export const Error = ({ message }) => {

    return (
        <div className="error-wrap">
            <div className="error">
                <h2>{message}</h2>
            </div>
        </div>

    );
};