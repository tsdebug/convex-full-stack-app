import { zid } from "convex-helpers/server/zod3";
import { z } from "zod";

export const createTodoSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    completed: z.boolean(),
});

export const updateTodoSchema = z.object({
    // INFO: zid does not do table name validation, it is just going to check if the id is a string
    id: zid ("todos"),
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    completed: z.boolean(),
});

export const deleteTodoSchema = z.object({
    id: zid("todos"),
});