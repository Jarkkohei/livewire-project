<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;
use App\Http\Resources\TaskResource;
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
        return (new TaskCollection(Task::all()))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'title' => 'required',
            'description' => 'nullable|string',
            'status' => 'required',
            'project_id' => 'required'
        ]);

        $task = Task::create($validatedData);
        $task->save();

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return (new TaskResource(Task::findOrFail($id)))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $task = Task::findOrFail($id);

        $validatedData = $request->validate([
            'user_id' => 'required',
            'title' => 'required',
            'description' => '',
            'status' => 'required',
            'project_id' => 'required'
        ]);

        $task->update($validatedData);

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(200);
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
        $perPage = $request->query('perPage', 10);

        $parsedFilter = json_decode($request->query('filter'));

        $filteredStatuses = collect($parsedFilter->statuses);

        return (new TaskCollection(Task::where('project_id', $projectId)->whereIn('status', $filteredStatuses)->orderBy($sortBy, $sortDir)->paginate($perPage)))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Display a listing of recent Tasks.
     *
     * @return \Illuminate\Http\Response
     */
    public function recent(Request $request)
    {
        return (new TaskCollection(Task::orderBy('created_at', 'desc')->take(10)->get()))
            ->response()
            ->setStatusCode(200);
    }
}
