"use client"

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api"

export default function TodoList() {
    const todos = useQuery(api.todos.getTodos);

    // A loader cuz initially the todos will be undefined
    if (todos === undefined){
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                {/* Changed colors to standard ones since for the loader to work */}
                <div className="w-8 h-8 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"/>
                <p>Loading tasks...</p> 
            </div>
        );
    }

    // incase there are no tasks in the todos
    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-98 gap-2">
                <div className="text-xl font-semibold text-muted-foreground">
                    No tasks yet.
                </div>
                <p className="text-sm text-muted-foreground">
                    Add some tasks to get started.
                </p>
            </div>
        );
    }

    // if tasks are available we loop through them all - render the titles of the tasks
    return (
        <div className="space-y-2">
            {todos?.map((todo) => <p key={todo._id}>{todo.title}</p>)}
        </div>
    )
}
