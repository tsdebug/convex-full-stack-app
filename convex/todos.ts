import { mutation, query } from "./_generated/server";
import { zCustomMutation } from "convex-helpers/server/zod3";
import { NoOp } from "convex-helpers/server/customFunctions"; // NoOp means - we dont want to change the input in
import { createTodoSchema, deleteTodoSchema, updateTodoSchema} from "../lib/zod";

const zMutation = zCustomMutation(mutation, NoOp);

// for the query function the args is not needed 
// to get the todos
export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db
        .query("todos")
        .collect();

        return todos.reverse();
    },
});

// for the mutation function the args is needed
// to create a todo
export const createTodo = zMutation({
    args: createTodoSchema,
    handler: async (ctx, args) => {
        return ctx.db.insert("todos", {
            title: args.title,
            completed: false,
        })
    },
})

// mutation to update a todo
export const updateTodo = zMutation({
    args: updateTodoSchema,
    handler: async (ctx, args)=>{
        return ctx.db.patch(args.id,{
            title: args.title,
            completed: args.completed,
        })
    }
});

// mutation to delete a todo
export const deleteTodo = zMutation({
    args: deleteTodoSchema,
    handler: async (ctx, args)=>{
        return ctx.db.delete(args.id);
    },
})
