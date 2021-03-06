<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['register' => false]);

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('/projects', 'ProjectController@index')->name('projects');

Route::group(['middleware'=>'auth', 'prefix'=>'admin'], function () {
    Route::livewire('/tasks', 'tasks')->name('tasks');
    Route::livewire('/task/create', 'task.create-task')->name('createTask');
    Route::livewire('/task/{id}/edit', 'task.edit-task')->name('editTask');
});

//Route::livewire('/project/{id}/tasks', 'tasks')->name('tasks');


Route::middleware('auth')->get('projects/{any?}', function () {
    return view('projects'); // or wherever your React app is bootstrapped.
})->where('any', '.*')
->name('projects');