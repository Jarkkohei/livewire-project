import React from 'react';

const Filtering = ({ statusIcons, setFilterValues }) => {

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-3">

                <div className="form-group col mb-0 px-1">
                    <label htmlFor="sortBySelect">
                        Filter by status:
                    </label>

                    <div className="row justify-content-between align-items-center px-2 text-center py-2">
                        {statusIcons.map(statusIcon => {
                            let classes = `col px-1 ${statusIcon.classes}`;
                            classes += statusIcon.included == true ? ' text-primary' : ' text-muted';
                            
                            return (
                                <i className={classes}
                                    key={statusIcon.value}
                                    title={statusIcon.label}
                                    style={{ cursor: 'pointer'}}
                                    onClick={() => setFilterValues(statusIcon.value)}
                                ></i>
                            );
                        })}
                    </div>

                </div>

            </div >
        </div>
    );
}

export default Filtering;