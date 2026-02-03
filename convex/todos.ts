import { mutation, query } from "./_generated/server";
import { zCustomMutation } from "convex-helpers/server/zod3";
import { NoOp } from "convex-helpers/server/customFunctions"; // NoOp means - we dont want to change the input in
import { createTodoSchema} from "../lib/zod";

const zMutation = zCustomMutation(mutation, NoOp);

// for the query function the args is not needed 
export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db
        .query("todos")
        .collect();

        return todos.reverse();
    },
});

// for the mutation function the args is needed
export const createTodo = zMutation({
    args: createTodoSchema,
    handler: async (ctx, args) => {
        return ctx.db.insert("todos", {
            title: args.title,
            completed: false,
        })
    },
})
