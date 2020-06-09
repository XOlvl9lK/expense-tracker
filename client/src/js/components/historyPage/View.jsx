import React, { useState } from "react";

export const View = ({ expenses }) => {
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ pageNumber, setPageNumber ] = useState(0);

    let history = [];
    if (expenses.length) {
        for (let i = currentPage; i < currentPage + 8; i++) {
            if (i >= expenses.length) {
                break;
            }
            if (Number(expenses[i].amount >= 0)) {
                history.push(
                    <p key={expenses[i].date}>
                        <span>
                            {new Date(expenses[i].date).toLocaleDateString()}
                            <span className="text-splitter"/>
                            {expenses[i].text}
                        </span>
                        <span>{expenses[i].amount}</span>
                        <span className="positive"/>
                    </p>
                );
            } else {
                history.push(
                    <p key={expenses[i].date}>
                        <span>
                            {new Date(expenses[i].date).toLocaleDateString()}
                            <span className="text-splitter"/>
                            {expenses[i].text}
                        </span>
                        <span>{expenses[i].amount}</span>
                        <span className="negative"/>
                    </p>
                );
            }
        }
    }

    const pageHandler = (event, direction) => {
        if (direction === 'left' && pageNumber !== 0) {
            setPageNumber(pageNumber - 1);
            setCurrentPage(currentPage - 8);
        } else if (direction === 'right' && (currentPage < expenses.length - 8)) {
            setPageNumber(pageNumber + 1);
            setCurrentPage(currentPage + 8);
        }
    };

    return (
        <div className="history-wrap">
            <h2 className="title">History</h2>

            <div className="history">
                { expenses.length ? history : <p className="plug">No transactions for now</p> }
            </div>
            { expenses.length > 8 ?
                <div className="navigation">
                    <span className="arrow-left" onClick={event => pageHandler(event, 'left')}>
                        &#171;
                    </span>
                    <span>{pageNumber + 1}</span>
                    <span className="arrow-right" onClick={event => pageHandler(event, 'right')}>
                        &#187;
                    </span>
                </div>
                :
                null
            }

        </div>
    )
};