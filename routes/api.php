<?php

use Illuminate\Http\Request;

use App\Task;
use App\Project;
use App\User;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\ProjectCollection;

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
Route::get('/tasks/{id}', function ($id) {
    return new TaskCollection(Task::where('id', $id)->get());
});

/* Get all Projects */
Route::get('/projects', function () {
    return new ProjectCollection(Project::with(['parent', 'children'])->get());
});

/* Get all Tasks for the selected Project */
Route::get('/projects/{project_id}/tasks', function ($project_id) {
    return new ProjectCollection(Task::where('project_id', $project_id)->get());
});