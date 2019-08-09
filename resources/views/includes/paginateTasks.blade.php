<div class="card d-flex justify-content-between shadow-sm mt-2">
    <div class="card-header d-flex justify-content-center align-items-center">
        <ul class="pagination mb-0">

            @if($currentPageNumber != 1)
                <li 
                    class="page-item" 
                    wire:click="showPage(1)" 
                    title="To first page" 
                >
                    <span class="page-link">&laquo;</span>
                </li>
            @endif

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

            @if($currentPageNumber != $pagesCount)
                <li 
                    class="page-item" 
                    wire:click="showPage({{ $pagesCount }})" 
                    title="To last page" 
                >
                    <span class="page-link">&raquo;</span>
                </li>
            @endif

        </ul>
    </div>
</div>