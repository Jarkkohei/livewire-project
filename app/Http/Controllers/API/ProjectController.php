<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Project;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
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
        return (new ProjectCollection(Project::with('tasks')->orderBy('title', 'asc')->get()))
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
            'title' => 'required',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|integer',
        ]);

        if($validatedData['parent_id']) {
            $parent = Project::findOrFail($validatedData['parent_id']);

            if($parent) {
                $validatedData['level'] = $parent->level + 1;
            }
        } else $validatedData['level'] = 1;

        $project = Project::create($validatedData);
        $project->save();

        return (new ProjectResource($project))
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
         return (new ProjectResource(Project::findOrFail($id)))
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
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|integer',
        ]);

        $project = Project::findOrFail($id);

        if($validatedData['parent_id']) {
            $parent = Project::findOrFail($validatedData['parent_id']);

            if($parent) {
                $validatedData['level'] = $parent->level + 1;
            }
        } else $validatedData['level'] = 1;

        $project->update($validatedData);
        
        return (new ProjectResource($project))
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
        //
    }
}
