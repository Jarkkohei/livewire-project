<?php

use Illuminate\Http\Request;

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
Route::get('/tasks', 'API\TaskController@index');

Route::post('/tasks', 'API\TaskController@store');

Route::put('/tasks/{id}', 'API\TaskController@update');

Route::delete('/tasks/{id}', 'API\TaskController@destroy');

/* Get Recent Tasks */
Route::get('/tasks/recent', 'API\TaskController@recent');

/* Get Task by id */
Route::get('/tasks/{id}', 'API\TaskController@show');

/* Get all Projects */
Route::get('/projects', 'API\ProjectController@index');

Route::post('/projects', 'API\ProjectController@store');

Route::put('/projects/{id}', 'API\ProjectController@update');

/* Get all Tasks for the selected Project */
Route::get('/projects/{id}/tasks', 'API\TaskController@tasksForProject');

Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');