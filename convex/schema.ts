import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // v - validator builder

export default defineSchema({
    todos: defineTable({
        title: v.string(),
        completed: v.boolean(),
    })
});