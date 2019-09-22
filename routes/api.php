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

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/login', 'API\AuthController@login');
    Route::post('/logout', 'API\AuthController@logout');
    Route::post('/refresh', 'API\AuthController@refresh');
    Route::post('/me', 'API\AuthController@me');

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

Route::get('projects/{id}', 'API\ProjectController@show');

Route::post('/projects', 'API\ProjectController@store');

Route::put('/projects/{id}', 'API\ProjectController@update');

Route::delete('/projects/{id}', 'API\ProjectController@destroy');

/* Get all Tasks for the selected Project */
Route::get('/projects/{id}/tasks', 'API\TaskController@tasksForProject');

Route::fallback(function(){
    return response()->json(['message' => 'Not Found.'], 404);
})->name('api.fallback.404');