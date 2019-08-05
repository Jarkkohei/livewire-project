@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
             @livewire('todos')
        </div>
    </div>
</div>
@endsection
