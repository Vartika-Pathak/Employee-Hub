import { createInsertSchema } from "drizzle-zod";
import { date, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const employeesTable = pgTable("people_ops_employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull(),
  startDate: date("start_date", { mode: "string" }).notNull(),
  initials: text("initials").notNull(),
  color: text("color").notNull(),
  phone: text("phone"),
  manager: text("manager"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const onboardingItemsTable = pgTable("people_ops_onboarding_items", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  dueDate: date("due_date", { mode: "string" }).notNull(),
});

export const documentsTable = pgTable("people_ops_documents", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  size: text("size").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
  status: text("status").notNull().default("pending"),
  objectPath: text("object_path"),
});

export const tasksTable = pgTable("people_ops_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  assignee: text("assignee").notNull(),
  dueDate: date("due_date", { mode: "string" }).notNull(),
  status: text("status").notNull(),
  priority: text("priority").notNull(),
  category: text("category").notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employeesTable).omit({ id: true, createdAt: true });
export const insertOnboardingItemSchema = createInsertSchema(onboardingItemsTable).omit({ id: true });
export const insertDocumentSchema = createInsertSchema(documentsTable).omit({ id: true, uploadedAt: true });
export const insertTaskSchema = createInsertSchema(tasksTable).omit({ id: true });

export type Employee = typeof employeesTable.$inferSelect;
export type OnboardingItem = typeof onboardingItemsTable.$inferSelect;
export type Document = typeof documentsTable.$inferSelect;
export type Task = typeof tasksTable.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;