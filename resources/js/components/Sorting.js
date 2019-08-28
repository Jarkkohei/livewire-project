import React from 'react';

const Sorting = ({ currentSortOptionId, options, setSortValues }) => {

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-0">

                <div className="form-group col mb-0">

                    <div className="row justify-content-start align-items-center">
                        <div className="col-12 col-sm-auto">
                            <label htmlFor="sortBySelect">
                                Order by:
                            </label>
                        </div>

                        <div className="col-12 col-sm-auto">
                            <select
                                value={currentSortOptionId}
                                onChange={setSortValues}
                                name="sortBySelect"
                                className="form-control form-control-sm shadow-sm"
                            >
                                {options && options.map((opt) => (
                                    <option
                                        key={opt.id}
                                        name={opt.label}
                                        value={opt.id}
                                    >
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>

            </div >
        </div >
    );
}

export default Sorting;