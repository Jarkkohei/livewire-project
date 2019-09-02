import React from 'react';

const Filtering = ({ statusIcons, setFilterValues, filteredTotal, total }) => {

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-header d-flex justify-content-between align-items-center flex-column flex-sm-row flex-lg-column px-3">

                <div className="form-group col mb-0 px-1">
                    <label htmlFor="sortBySelect">
                        Filter by status:
                    </label>
                    
                    <span
                        className="ml-2 badge badge-pill badge-light float-right"
                        style={{ fontSize: 14, cursor: 'default' }}
                        title={`Showing ${filteredTotal} filtered tasks of total ${total} `}
                    >
                        {filteredTotal} / {total}
                    </span>

                    <div className="row justify-content-between align-items-center px-2 text-center py-2">
                        {statusIcons.map(statusIcon => {
                            let classes = `col px-1 ${statusIcon.classes}`;
                            classes += statusIcon.included == true ? ' text-primary' : ' text-muted';
                            
                            return (
                                <i className={classes}
                                    key={statusIcon.id}
                                    title={statusIcon.label}
                                    style={{ cursor: 'pointer'}}
                                    onClick={() => setFilterValues(statusIcon.id)}
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