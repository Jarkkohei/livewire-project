@foreach($projects as $project)
    <li id="projectListItem-{{ $project['id'] }}"
        class="list-group-item projectsListItem {{ $project['id'] == $currentProjectId ? 'active' : '' }}"
        title="{{ $project['description'] }}"
        wire:click="setCurrentProjectId({{ $project['id'] }})"
    >
        <span style="padding-left: {{ ($project['level'] * 10) - 10 }}px">{{ $project['title'] }}</span> 
        
        @if(count($project['children']))
            <i id="projectListItemCaret-{{ $project['id'] }}"
                class="float-right fas fa-caret-{{ $project['showChildren'] ? 'down' : 'right' }} fa-lg px-2 py-1"
                wire:click="toggleShowChildren({{ $loop->index }})"
            ></i>
        @endif
    </li>

    @if(count($project['children']) && $project['showChildren'])
        <div id="projectListItemChildren-{{ $project['id'] }}" 
            class="list-group list-group-flush"
            wire:transition.fade
        >
            @include('includes.subProjects', ['projects' => $project['children']])
        </div>
    @endif
@endforeach