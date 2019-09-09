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
        return new ProjectCollection(Project::with('tasks')->orderBy('title', 'asc')->get());
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

        //return new ProjectCollection(Project::where('id', $project->id)->get());
        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //return new ProjectCollection(Project::findOrFail($id));
         return new ProjectResource(Project::findOrFail($id));
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

        //return new ProjectCollection(Project::where('id', $id)->get());
        return new ProjectResource($project);
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
