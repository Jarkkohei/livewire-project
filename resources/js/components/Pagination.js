// Instantiated in components/TaskList.js
import React, { useState } from 'react';

const Pagination = ({ meta, perPageOptions, setPaginationValues }) => {

    const perPage = meta.per_page;
    const [goToPage, setGoToPage] = useState(meta.current_page);

    const handleGoToPage = (e) => {
        if (e.target.value < 1) {
            setGoToPage(1);
        } else if (e.target.value > meta.last_page) {
            setGoToPage(meta.last_page);
        } else {
            setGoToPage(e.target.value);
        }
    }

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header">

                <div className="row justify-content-between align-items-center flex-column flex-sm-row">

                    <div className="col-auto">
                        <div className="input-group input-group-sm" style={{ maxWidth: 130 }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">Per page</span>
                            </div>
                            <select
                                name="perPageSelect"
                                className="form-control form-control-sm shadow-sm"
                                value={perPage}
                                onChange={(e) => { setPaginationValues({ pageNumber: 1, perPage: e.target.value }) }}
                            >
                                {perPageOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-auto">
                        <div className="form-group row justify-content-center justify-content-sm-between align-items-center mb-0">
                            <nav aria-label="Task pagination links" className="mt-3 mt-sm-0">
                                <ul className="pagination mb-0">

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: 1, perPage: perPage }) }}
                                            aria-label="First"
                                            title="First"
                                            disabled={meta.current_page == 1}
                                        >
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.current_page - 1, perPage: perPage }) }}
                                            aria-label="Previous"
                                            title="Previous"
                                            disabled={meta.current_page == 1}
                                        >
                                            <span aria-hidden="true">&lsaquo;</span>
                                        </button>
                                    </li>

                                    <li className="page-item active" aria-current="page">
                                        <a
                                            className="page-link"
                                            href="#"
                                        >
                                            {meta.current_page} of {meta.last_page} <span className="sr-only">(current)</span>
                                        </a>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.current_page + 1, perPage: perPage }) }}
                                            aria-label="Next"
                                            title="Next"
                                            disabled={meta.current_page == meta.last_page}
                                        >
                                            <span aria-hidden="true">&rsaquo;</span>
                                        </button>
                                    </li>

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            onClick={() => { setPaginationValues({ pageNumber: meta.last_page, perPage: perPage }) }}
                                            aria-label="Last"
                                            title="Last"
                                            disabled={meta.current_page == meta.last_page}
                                        >
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="col-auto">
                        <div className="form-group row justify-content-center align-items-center mb-0">
                            <div className="input-group input-group-sm mt-3 mt-sm-0 mr-2 ml-auto" style={{ maxWidth: 115 }}>
                                <input
                                    type="text"
                                    className="form-control form-control-sm shadow-sm"
                                    min="1"
                                    max={meta.last_page}
                                    placeholder="Go to page"
                                    autoComplete="off"
                                    onChange={handleGoToPage}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => { setPaginationValues({ pageNumber: goToPage, perPage: perPage }) }}
                                        disabled={false}
                                    >Go</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Pagination;