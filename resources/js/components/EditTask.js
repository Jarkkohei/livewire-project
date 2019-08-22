import React from 'react';
import { NavLink } from 'react-router-dom';

const EditTask = (props) => {
    return (
        <>
            <div className="card shadow-sm">

                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        Edit task
                    </div>
                    <div>
                        <button
                            class="btn btn-sm btn-outline-secondary"
                            onClick={() => {}}
                            title="go back"
                        >
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                    </div>
                </div>

            
                <div className="card-body">
                    <div className="form-group ">
                        <label htmlFor="editTaskTitle">Title</label>
                        <small className="text-danger">(required)</small>
                        <input
                            id="editTaskTitle"
                            name="editTaskTitle"
                            type="text"
                            className="form-control form-control shadow-sm"
                            placeholder="Title..."
                            onBlur={() => {}}
                            aria-describedby="titleErrors"
                            autoComplete="off"
                        />

                        {/*
                        @if($errors->has('title'))
                            <small id="titleErrors" className="form-text text-danger">{{ $errors-> first('title')}}</small>
                        @endif
                        */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="editTaskDescription">Description</label>
                        <textarea
                            id="editTaskDescription"
                            name="editTaskDescription"
                            className="form-control shadow-sm"
                            placeholder="Description..."
                            rows="5"
                            onBlur={() => {}}
                            aria-describedby="descriptionErrors"
                            autoComplete="off"
                        ></textarea>

                        {/*
                        @if($errors->has('description'))
                                        <small id="descriptionErrors" className="form-text text-danger">{{ $errors-> first('description')}}</small>
                        @endif
                        */}
                    </div>

                    <div className="form-group">
                        <label htmlFor="editTaskStatus">Status</label>
                        <select
                            id="editTaskStatus"
                            name="editTaskStatus"
                            className="form-control form-control shadow-sm"
                            onChange={() => {}}
                        >
                            {/*
                            @foreach($taskStatuses as $taskStatus)
                                <option
                                    name="{{ $taskStatus['label'] }}"
                                    value="{{ $taskStatus['value'] }}"
                                    {{ $status == $taskStatus['value'] ? 'selected' : ''}}
                                >
                                    {{ $taskStatus['label'] }}
                                </option>
                            @endforeach
                            */}
                        </select >

                        {/*
                        @if ($errors -> has('status'))
                            <small id="statusErrors" className="form-text text-danger">{{ $errors-> first('status')}}</small>
                        @endif
                        */}
                    </div >

                    <div className="form-group">
                        <button
                            className="btn btn-success form-control"
                            onClick={() => {}}
                            type="submit"
                            title="Save task"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditTask;
