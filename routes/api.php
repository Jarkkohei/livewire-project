<?php

use Illuminate\Http\Request;

use App\Task;
use App\Http\Resources\TaskCollection;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Get all tasks */
Route::get('/tasks', function () {
    return new TaskCollection(Task::all());
});

/* Get Task by id */
Route::get('/task/{id}', function ($id) {
    return new TaskCollection(Task::where('id', $id)->get());
});

/* Get all Tasks for a User */
Route::get('/user/{id}/tasks', function ($id) {
    return new TaskCollection(Task::where('user_id', $id)->get());
});

/* Get all Projects for the selected user */
Route::get('/user/{id}/projects', function ($id) {
    $user = User::find($id);
    return new ProjectCollection($user->projects());
});