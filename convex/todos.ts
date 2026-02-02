import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
export const createTodo = mutation({
    args: {
        title: v.string(),
        completed: v.boolean(),
    },
    handler: async (ctx, args) => {
        return ctx.db.insert("todos", {
            title: args.title,
            completed: false,
        })
    },
})
