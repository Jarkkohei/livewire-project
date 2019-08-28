<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;
use App\Http\Resources\TaskCollection;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new TaskCollection(Task::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new TaskCollection(Task::where('id', $id)->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Return tasks for specific project.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function tasksForProject($projectId, Request $request)
    {
        $sortBy = $request->query('sortBy', 'status');
        $sortDir = $request->query('sortDir', 'desc');

        return new TaskCollection(Task::where('project_id', $projectId)->orderBy($sortBy, $sortDir)->paginate(10));
    }

    /**
     * Display a listing of recent Tasks.
     *
     * @return \Illuminate\Http\Response
     */
    public function recent(Request $request)
    {
        return new TaskCollection(Task::orderBy('created_at', 'desc')->take(10)->get());
    }
}
