import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // v - validator builder
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    todos: defineTable({
        title: v.string(),
        completed: v.boolean(),
    })
});