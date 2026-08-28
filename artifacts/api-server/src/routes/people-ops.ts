import { and, eq, ilike } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  attendanceRecordsTable,
  db,
  documentsTable,
  employeesTable,
  leaveRequestsTable,
  onboardingItemsTable,
  tasksTable,
} from "@workspace/db";
import {
  CreateEmployeeBody,
  CreateEmployeeResponse,
  CreateEmployeeDocumentBody,
  CreateEmployeeDocumentParams,
  CreateEmployeeDocumentResponse,
  CreateTaskBody,
  CreateTaskResponse,
  GetAttendanceSummaryResponse,
  GetAttendanceRecordsQueryParams,
  GetAttendanceRecordsResponse,
  GetDashboardActivityResponse,
  GetDashboardSummaryResponse,
  GetEmployeeDocumentsParams,
  GetEmployeeDocumentsResponse,
  GetEmployeeOnboardingParams,
  GetEmployeeOnboardingResponse,
  GetEmployeeParams,
  GetEmployeeResponse,
  GetEmployeesQueryParams,
  GetEmployeesResponse,
  GetLeaveRequestsQueryParams,
  GetLeaveRequestsResponse,
  GetReportsSummaryResponse,
  GetTasksQueryParams,
  GetTasksResponse,
  UpdateEmployeeBody,
  UpdateEmployeeParams,
  UpdateEmployeeResponse,
  UpdateLeaveRequestBody,
  UpdateLeaveRequestParams,
  UpdateLeaveRequestResponse,
  UpdateTaskBody,
  UpdateTaskParams,
  UpdateTaskResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const people = [
  { name: "Maya Chen", email: "maya.chen@northstar.co", role: "Product Designer", department: "Design", location: "New York", status: "active", startDate: "2022-04-18", initials: "MC", color: "coral", phone: "+1 212 555 0182", manager: "Jon Bell" },
  { name: "Julian Carter", email: "julian.carter@northstar.co", role: "Senior Engineer", department: "Engineering", location: "London", status: "active", startDate: "2021-09-06", initials: "JC", color: "blue", phone: "+44 20 7946 0912", manager: "Priya Nair" },
  { name: "Priya Nair", email: "priya.nair@northstar.co", role: "Engineering Manager", department: "Engineering", location: "Bengaluru", status: "active", startDate: "2020-06-22", initials: "PN", color: "lavender", phone: "+91 80 5555 0123", manager: "Jon Bell" },
  { name: "Elena Rossi", email: "elena.rossi@northstar.co", role: "People Partner", department: "People", location: "Milan", status: "active", startDate: "2023-01-16", initials: "ER", color: "mint", phone: null, manager: "Maya Chen" },
  { name: "Noah Williams", email: "noah.williams@northstar.co", role: "Customer Success Lead", department: "Customer Success", location: "Austin", status: "onboarding", startDate: "2024-05-20", initials: "NW", color: "gold", phone: null, manager: "Elena Rossi" },
  { name: "Amara Okafor", email: "amara.okafor@northstar.co", role: "Marketing Manager", department: "Marketing", location: "Lagos", status: "active", startDate: "2022-11-07", initials: "AO", color: "peach", phone: null, manager: "Jon Bell" },
];

const activity = [
  { id: 1, text: "Maya Chen completed her tax declaration", timestamp: "12 min ago", kind: "document", initials: "MC", color: "coral" },
  { id: 2, text: "Noah Williams started onboarding", timestamp: "1 hr ago", kind: "onboarding", initials: "NW", color: "gold" },
  { id: 3, text: "Julian Carter updated his emergency contact", timestamp: "3 hrs ago", kind: "profile", initials: "JC", color: "blue" },
  { id: 4, text: "Quarterly headcount report was generated", timestamp: "Yesterday", kind: "report", initials: "PO", color: "lavender" },
];

let seedPromise: Promise<void> | undefined;
async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const existing = await db.select({ id: employeesTable.id }).from(employeesTable).limit(1);
      let employeeRows = existing;
      if (existing.length === 0) {
        const inserted = await db.insert(employeesTable).values(people).returning({ id: employeesTable.id });
        employeeRows = inserted;
        const onboarding = inserted.flatMap((employee, index) => [
          { employeeId: employee.id, title: "Complete personal details", category: "Profile", status: index === 4 ? "in_progress" : "done", dueDate: "2024-06-03" },
          { employeeId: employee.id, title: "Upload identity document", category: "Documents", status: index === 4 ? "todo" : "done", dueDate: "2024-06-05" },
          { employeeId: employee.id, title: "Meet your manager", category: "Connections", status: index === 4 ? "todo" : "done", dueDate: "2024-06-07" },
        ]);
        await db.insert(onboardingItemsTable).values(onboarding);
        await db.insert(documentsTable).values([
          { employeeId: inserted[0].id, name: "Tax declaration 2024.pdf", type: "PDF", size: "1.2 MB", status: "verified", objectPath: null },
          { employeeId: inserted[0].id, name: "Passport copy.pdf", type: "PDF", size: "840 KB", status: "verified", objectPath: null },
          { employeeId: inserted[4].id, name: "Offer letter.pdf", type: "PDF", size: "624 KB", status: "pending", objectPath: null },
        ]);
        await db.insert(tasksTable).values([
          { title: "Review Noah's identity documents", assignee: "Elena Rossi", dueDate: "2024-06-05", status: "in_progress", priority: "high", category: "Onboarding" },
          { title: "Schedule June manager check-ins", assignee: "Maya Chen", dueDate: "2024-06-07", status: "todo", priority: "medium", category: "People" },
          { title: "Share quarterly headcount report", assignee: "Elena Rossi", dueDate: "2024-06-04", status: "done", priority: "low", category: "Reporting" },
          { title: "Collect updated emergency contacts", assignee: "Elena Rossi", dueDate: "2024-06-12", status: "todo", priority: "medium", category: "Compliance" },
        ]);
      }
      const attendanceExisting = await db.select({ id: attendanceRecordsTable.id }).from(attendanceRecordsTable).limit(1);
      if (attendanceExisting.length === 0) {
        await db.insert(attendanceRecordsTable).values([
          { employeeId: employeeRows[0].id, date: "2024-06-03", status: "present", punchIn: "08:54", punchOut: "17:42", workedHours: "8h 48m" },
          { employeeId: employeeRows[1].id, date: "2024-06-03", status: "late", punchIn: "09:26", punchOut: "18:10", workedHours: "8h 44m" },
          { employeeId: employeeRows[2].id, date: "2024-06-03", status: "present", punchIn: "08:47", punchOut: "17:31", workedHours: "8h 44m" },
          { employeeId: employeeRows[3].id, date: "2024-06-03", status: "on_leave", punchIn: null, punchOut: null, workedHours: null },
          { employeeId: employeeRows[4].id, date: "2024-06-03", status: "absent", punchIn: null, punchOut: null, workedHours: null },
          { employeeId: employeeRows[5].id, date: "2024-06-03", status: "present", punchIn: "09:02", punchOut: "17:55", workedHours: "8h 53m" },
        ]);
      }
      const leaveExisting = await db.select({ id: leaveRequestsTable.id }).from(leaveRequestsTable).limit(1);
      if (leaveExisting.length === 0) {
        await db.insert(leaveRequestsTable).values([
          { employeeId: employeeRows[3].id, leaveType: "Annual leave", startDate: "2024-06-10", endDate: "2024-06-12", days: 3, reason: "Family visit", status: "pending" },
          { employeeId: employeeRows[1].id, leaveType: "Medical leave", startDate: "2024-06-17", endDate: "2024-06-17", days: 1, reason: "Doctor appointment", status: "pending" },
          { employeeId: employeeRows[0].id, leaveType: "Annual leave", startDate: "2024-05-27", endDate: "2024-05-28", days: 2, reason: "Short break", status: "approved" },
        ]);
      }
    })();
  }
  await seedPromise;
}

function isoDocument(document: typeof documentsTable.$inferSelect) {
  return { ...document, uploadedAt: document.uploadedAt.toISOString() };
}

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const employees = await db.select().from(employeesTable);
  const tasks = await db.select().from(tasksTable);
  res.json(GetDashboardSummaryResponse.parse({
    totalEmployees: employees.length,
    newHires: employees.filter((employee) => employee.status === "onboarding").length,
    attendanceRate: 96.2,
    openTasks: tasks.filter((task) => task.status !== "done").length,
    employeeChange: 8.4,
    newHiresChange: 12.5,
  }));
});

router.get("/dashboard/activity", (_req, res): void => {
  res.json(GetDashboardActivityResponse.parse(activity));
});

router.get("/employees", async (req, res): Promise<void> => {
  await ensureSeeded();
  const parsed = GetEmployeesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const conditions = [];
  if (parsed.data.search) {
    conditions.push(ilike(employeesTable.name, `%${parsed.data.search}%`));
  }
  if (parsed.data.status) {
    conditions.push(eq(employeesTable.status, parsed.data.status));
  }
  const employees = await db.select().from(employeesTable).where(conditions.length ? and(...conditions) : undefined).orderBy(employeesTable.name);
  res.json(GetEmployeesResponse.parse(employees));
});

router.post("/employees", async (req, res): Promise<void> => {
  const parsed = CreateEmployeeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [employee] = await db.insert(employeesTable).values(parsed.data).returning();
  res.status(201).json(CreateEmployeeResponse.parse(employee));
});

router.get("/employees/:employeeId", async (req, res): Promise<void> => {
  await ensureSeeded();
  const params = GetEmployeeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [employee] = await db.select().from(employeesTable).where(eq(employeesTable.id, params.data.employeeId));
  if (!employee) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }
  res.json(GetEmployeeResponse.parse(employee));
});

router.patch("/employees/:employeeId", async (req, res): Promise<void> => {
  const params = UpdateEmployeeParams.safeParse(req.params);
  const body = UpdateEmployeeBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: !params.success ? params.error.message : body.error?.message ?? "Invalid request body" });
    return;
  }
  const [employee] = await db.update(employeesTable).set(body.data).where(eq(employeesTable.id, params.data.employeeId)).returning();
  if (!employee) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }
  res.json(UpdateEmployeeResponse.parse(employee));
});

router.get("/employees/:employeeId/onboarding", async (req, res): Promise<void> => {
  await ensureSeeded();
  const params = GetEmployeeOnboardingParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const items = await db.select().from(onboardingItemsTable).where(eq(onboardingItemsTable.employeeId, params.data.employeeId)).orderBy(onboardingItemsTable.id);
  res.json(GetEmployeeOnboardingResponse.parse(items));
});

router.get("/employees/:employeeId/documents", async (req, res): Promise<void> => {
  await ensureSeeded();
  const params = GetEmployeeDocumentsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const documents = await db.select().from(documentsTable).where(eq(documentsTable.employeeId, params.data.employeeId)).orderBy(documentsTable.uploadedAt);
  res.json(GetEmployeeDocumentsResponse.parse(documents.map(isoDocument)));
});

router.post("/employees/:employeeId/documents", async (req, res): Promise<void> => {
  const params = CreateEmployeeDocumentParams.safeParse(req.params);
  const body = CreateEmployeeDocumentBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: !params.success ? params.error.message : body.error?.message ?? "Invalid request body" });
    return;
  }
  const [document] = await db.insert(documentsTable).values({ ...body.data, employeeId: params.data.employeeId, status: "pending" }).returning();
  res.status(201).json(CreateEmployeeDocumentResponse.parse(isoDocument(document)));
});

router.get("/attendance/summary", (_req, res): void => {
  res.json(GetAttendanceSummaryResponse.parse({
    rate: 96.2,
    present: 112,
    late: 8,
    absent: 3,
    trend: [
      { day: "Mon", rate: 95.8 }, { day: "Tue", rate: 97.1 }, { day: "Wed", rate: 96.4 },
      { day: "Thu", rate: 95.2 }, { day: "Fri", rate: 96.2 },
    ],
  }));
});

router.get("/attendance/records", async (req, res): Promise<void> => {
  await ensureSeeded();
  const parsed = GetAttendanceRecordsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const conditions = [];
  if (parsed.data.date) conditions.push(eq(attendanceRecordsTable.date, parsed.data.date));
  if (parsed.data.status) conditions.push(eq(attendanceRecordsTable.status, parsed.data.status));
  const records = await db
    .select({
      id: attendanceRecordsTable.id,
      employeeId: employeesTable.id,
      employeeName: employeesTable.name,
      initials: employeesTable.initials,
      color: employeesTable.color,
      date: attendanceRecordsTable.date,
      status: attendanceRecordsTable.status,
      punchIn: attendanceRecordsTable.punchIn,
      punchOut: attendanceRecordsTable.punchOut,
      workedHours: attendanceRecordsTable.workedHours,
    })
    .from(attendanceRecordsTable)
    .innerJoin(employeesTable, eq(attendanceRecordsTable.employeeId, employeesTable.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(employeesTable.name);
  res.json(GetAttendanceRecordsResponse.parse(records));
});

router.get("/leave-requests", async (req, res): Promise<void> => {
  await ensureSeeded();
  const parsed = GetLeaveRequestsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const requests = await db
    .select({
      id: leaveRequestsTable.id,
      employeeId: employeesTable.id,
      employeeName: employeesTable.name,
      initials: employeesTable.initials,
      color: employeesTable.color,
      leaveType: leaveRequestsTable.leaveType,
      startDate: leaveRequestsTable.startDate,
      endDate: leaveRequestsTable.endDate,
      days: leaveRequestsTable.days,
      reason: leaveRequestsTable.reason,
      status: leaveRequestsTable.status,
      requestedAt: leaveRequestsTable.requestedAt,
    })
    .from(leaveRequestsTable)
    .innerJoin(employeesTable, eq(leaveRequestsTable.employeeId, employeesTable.id))
    .where(parsed.data.status ? eq(leaveRequestsTable.status, parsed.data.status) : undefined)
    .orderBy(leaveRequestsTable.requestedAt);
  res.json(GetLeaveRequestsResponse.parse(requests.map((request) => ({
    ...request,
    requestedAt: request.requestedAt.toISOString(),
  }))));
});

router.patch("/leave-requests/:leaveId", async (req, res): Promise<void> => {
  await ensureSeeded();
  const params = UpdateLeaveRequestParams.safeParse(req.params);
  const body = UpdateLeaveRequestBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: !params.success ? params.error.message : body.error?.message ?? "Invalid request body" });
    return;
  }
  const [updated] = await db
    .update(leaveRequestsTable)
    .set({ status: body.data.status })
    .where(eq(leaveRequestsTable.id, params.data.leaveId))
    .returning({ id: leaveRequestsTable.id });
  if (!updated) {
    res.status(404).json({ error: "Leave request not found" });
    return;
  }
  const [request] = await db
    .select({
      id: leaveRequestsTable.id,
      employeeId: employeesTable.id,
      employeeName: employeesTable.name,
      initials: employeesTable.initials,
      color: employeesTable.color,
      leaveType: leaveRequestsTable.leaveType,
      startDate: leaveRequestsTable.startDate,
      endDate: leaveRequestsTable.endDate,
      days: leaveRequestsTable.days,
      reason: leaveRequestsTable.reason,
      status: leaveRequestsTable.status,
      requestedAt: leaveRequestsTable.requestedAt,
    })
    .from(leaveRequestsTable)
    .innerJoin(employeesTable, eq(leaveRequestsTable.employeeId, employeesTable.id))
    .where(eq(leaveRequestsTable.id, params.data.leaveId));
  res.json(UpdateLeaveRequestResponse.parse({
    ...request,
    requestedAt: request.requestedAt.toISOString(),
  }));
});

router.get("/reports/summary", async (_req, res): Promise<void> => {
  await ensureSeeded();
  const employees = await db.select().from(employeesTable);
  const departments = [...new Set(employees.map((employee) => employee.department))].map((department) => ({
    department,
    count: employees.filter((employee) => employee.department === department).length,
  }));
  res.json(GetReportsSummaryResponse.parse({
    headcount: employees.length,
    departments,
    hiring: [{ label: "Jan", value: 2 }, { label: "Feb", value: 1 }, { label: "Mar", value: 3 }, { label: "Apr", value: 2 }, { label: "May", value: 4 }, { label: "Jun", value: 2 }],
    retention: 94.6,
  }));
});

router.get("/tasks", async (req, res): Promise<void> => {
  await ensureSeeded();
  const parsed = GetTasksQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const tasks = await db.select().from(tasksTable).where(parsed.data.status ? eq(tasksTable.status, parsed.data.status) : undefined).orderBy(tasksTable.dueDate);
  res.json(GetTasksResponse.parse(tasks));
});

router.post("/tasks", async (req, res): Promise<void> => {
  const parsed = CreateTaskBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [task] = await db.insert(tasksTable).values(parsed.data).returning();
  res.status(201).json(CreateTaskResponse.parse(task));
});

router.patch("/tasks/:taskId", async (req, res): Promise<void> => {
  const params = UpdateTaskParams.safeParse(req.params);
  const body = UpdateTaskBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: !params.success ? params.error.message : body.error?.message ?? "Invalid request body" });
    return;
  }
  const [task] = await db.update(tasksTable).set(body.data).where(eq(tasksTable.id, params.data.taskId)).returning();
  if (!task) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(UpdateTaskResponse.parse(task));
});

export default router;