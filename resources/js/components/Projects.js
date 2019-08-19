import React from 'react';

const Projects = (props) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-start align-items-center projectsListCardHeader">
                <div>Projects</div>
            </div>

            <ul className="list-group list-group-flush">
                {/*}
                    @foreach($projects as $project)
                        @if($project['visible'])
                            <li id="projectListItem-{{ $project['id'] }}"
                                    className="list-group-item projectsListItem {{ $project['id'] == $currentProjectId ? 'active' : '' }}"
                                    title="{{ $project['description'] }}"
                                    wire: click="setCurrentProjectId({{ $project['id'] }})"
                            >
                                <span style="padding-left: {{ ($project['level'] * 10) - 10 }}px">{{ $project['title'] }}</span>

                                @if(count($project['children']))
                                    @if($project['showChildren'])
                                        <i id="projectListItemCaret-{{ $project['id'] }}"
                                            className="float-right fas fa-caret-down fa-lg px-2 py-1"
                                            wire: click="hideChildren({{ $project['id'] }})"
                                        ></i>
                                    @else
                                        <i id="projectListItemCaret-{{ $project['id'] }}"
                                            className="float-right fas fa-caret-right fa-lg px-2 py-1"
                                            wire: click="showChildren({{ $project['id'] }})"
                                        ></i>
                                    @endif
                                @endif
                            </li>
                        @endif
                    @endforeach
                    */}
            </ul>

        </div> 
    );
}

export default Projects;
