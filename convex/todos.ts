import { mutation, query } from "./_generated/server";
import { zCustomMutation } from "convex-helpers/server/zod3";
import { NoOp } from "convex-helpers/server/customFunctions"; // NoOp means - we dont want to change the input in
import { createTodoSchema, deleteTodoSchema, updateTodoSchema } from "../lib/zod";

// checks the encrypted cookie sent with the request. returns null, when the person isn't logged in. If logged in, it returns the user's id. We can use this to "tag" our todos with the user that created them. This way, we can show each user only their own todos.
import { getAuthUserId } from "@convex-dev/auth/server";

const zMutation = zCustomMutation(mutation, NoOp);

// for the query function the args is not needed 
// to get the todos
export const getTodos = query({
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) return []; // If not logged in, return nothing

        return await ctx.db
            .query("todos")
            .withIndex("by_userId", (q) => q.eq("userId", userId)) // Only my tasks
            .collect();
    },
});

// for the mutation function the args is needed
// to create a todo
export const createTodo = zMutation({
    args: createTodoSchema,
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) throw new Error("Not authorized");

        return ctx.db.insert("todos", {
            title: args.title,
            completed: false,
            userId: userId, // Automatically attach the owner
        });
    },
});

// mutation to update a todo
export const updateTodo = zMutation({
    args: updateTodoSchema,
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        const todo = await ctx.db.get(args.id);

        // Logic: Check if it exists AND if the owner matches
        if (!todo || todo.userId !== userId) {
            throw new Error("You do not have permission to delete this task");
        }

        return ctx.db.patch(args.id, {
            title: args.title,
            completed: args.completed,
        })
    }
});

// mutation to delete a todo
export const deleteTodo = zMutation({
    args: deleteTodoSchema,
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        const todo = await ctx.db.get(args.id);

        // Logic: Check if it exists AND if the owner matches
        if (!todo || todo.userId !== userId) {
            throw new Error("You do not have permission to delete this task");
        }

        return await ctx.db.delete(args.id);
    },
});
