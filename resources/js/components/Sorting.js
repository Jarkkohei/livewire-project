import React from 'react';

const Sorting = ({ currentSortOptionId, options, setSortValues }) => {

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-3">

                <div className="form-group col mb-0 px-1">
                    <label htmlFor="sortBySelect">
                        Order by:
                    </label>
                
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

            </div >
        </div>
    );
}

export default Sorting;