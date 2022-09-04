import React from "react";

export const Pagination = ({linksPerPage, totalLinks, paginate, prevHandler, nextHandler}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLinks / linksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="row">
            <ul className="pagination col s8 offset-s2 center">
                <li class="waves-effect"><a href="#!" onClick={prevHandler}><i class="material-icons">chevron_left</i></a></li>
                {
                    pageNumbers.map(number => (
                        <li className="waves-effect" key={number}>
                            <a href="#!" onClick={() => paginate(number)}>
                                {number}
                            </a>
                        </li>
                    ))
                }
                <li class="waves-effect"><a href="#!" onClick={nextHandler}><i class="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
    );
};