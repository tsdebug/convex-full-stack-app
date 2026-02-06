import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; // v - validator builder
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,
    todos: defineTable({
        title: v.string(),
        completed: v.boolean(),
        userId: v.id("users"), // The "Name Tag"
    }).index("by_userId", ["userId"]), // The "Highlighter" for fast searching
});

// The Logic: "tag" every todo, in terms of db - a Foreign Key. We also need an Index. An index is like a "sorting" system that lets Convex jump straight to your tasks.