<div class="card d-flex justify-content-between shadow-sm mt-4">
    <div class="card-header d-flex justify-content-center align-items-center">
        <ul class="pagination mb-0">

            <li 
                class="page-item" 
                wire:click="showPage(1)" 
                title="To first page" 
                style="cursor: pointer;"
            >
                <span class="page-link">&laquo;</span>
            </li>

                {{--
                @foreach($pages as $page)
                    <li 
                        class="page-item {{ $page['id'] == $currentPageNumber ? 'active' : '' }}"
                        style="{{ $page['id'] == $currentPageNumber ? 'cursor: default;' : 'cursor: pointer;' }}"
                        wire:click="showPage({{ $page['id'] }})" 
                        title="{{ $page['id'] == $currentPageNumber ? 'The current page' : $page['title'] }}"
                    >
                        <span class="page-link">
                            {{ $page['label'] }}
                        </span>
                    </li>
                @endforeach--}}

                @for ($i = 1; $i <= $pagesCount; $i++)
                    <li 
                        class="page-item {{ $i == $currentPageNumber ? 'active' : '' }}"
                        style="{{ $i == $currentPageNumber ? 'cursor: default;' : 'cursor: pointer;' }}"
                        wire:click="showPage({{ $i }})" 
                        {{--title="{{ $i == $currentPageNumber ? 'The current page' : 'to page {{ $page['title'] }}' }}"--}}
                    >
                        <span class="page-link">
                            {{ $i }}
                        </span>
                    </li>
                @endfor

            <li 
                class="page-item" 
                wire:click="showPage({{ $pagesCount }})" 
                title="To last page" 
                style="cursor: pointer;"
            >
                <span class="page-link">&raquo;</span>
            </li>

        </ul>
    </div>
</div>