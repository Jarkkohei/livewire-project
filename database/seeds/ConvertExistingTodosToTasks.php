<?php

use Illuminate\Database\Seeder;
use App\Todo;
use App\Task;

class ConvertExistingTodosToTasks extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $todos = Todo::all();

        foreach($todos as $todo) {
            Task::create([
                'user_id' => $todo->user_id,
                'title' => $todo->title,
                'description' => $todo->description,
                'status' => $todo->completed == 0 ? 1 : 0,
                'created_at' => $todo->created_at,
                'updated_at' => $todo->updated_at,
                'deleted_at' => $todo->deleted_at
            ]);
        };
    }
}
