import { useQuery, useMutation } from '@tanstack/react-query';

const BASE_URL = 'http://localhost:8080';

export type Employee = {
  id: number;
  name: string;
  email?: string | null;
  role: string;
  department?: string | null;
  location?: string | null;
  status?: string | null;
  startDate?: string | null;
  phone?: string | null;
  manager?: string | null;
  initials?: string | null;
  color?: string | null;
};

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json();
}

export function getGetEmployeesQueryKey(params?: { search?: string; status?: string }) {
  return ['employees', params?.search ?? '', params?.status ?? ''];
}

export function getGetEmployeeQueryKey(id: number) {
  return ['employees', id];
}

export function useGetEmployees(params?: { search?: string; status?: string }) {
  return useQuery({
    queryKey: getGetEmployeesQueryKey(params),
    queryFn: () => {
      const query = new URLSearchParams();
      if (params?.search) query.set('search', params.search);
      if (params?.status) query.set('status', params.status);
      const qs = query.toString();
      return fetchJson<Employee[]>(`${BASE_URL}/employees${qs ? `?${qs}` : ''}`);
    },
  });
}

export function useGetEmployee(id: number) {
  return useQuery({
    queryKey: getGetEmployeeQueryKey(id),
    queryFn: () => fetchJson<Employee>(`${BASE_URL}/employees/${id}`),
    enabled: !!id,
  });
}

export function useCreateEmployee() {
  return useMutation({
    mutationFn: (variables: { data: Partial<Employee> }) =>
      fetchJson<Employee>(`${BASE_URL}/employees`, {
        method: 'POST',
        body: JSON.stringify(variables.data),
      }),
  });
}

export function useUpdateEmployee() {
  return useMutation({
    mutationFn: (variables: { employeeId: number; data: Partial<Employee> }) =>
      fetchJson<Employee>(`${BASE_URL}/employees/${variables.employeeId}`, {
        method: 'PUT',
        body: JSON.stringify(variables.data),
      }),
  });
}

export type Task = {
  id: number;
  title: string;
  assignee: string;
  dueDate?: string | null;
  status?: string | null;
  priority?: string | null;
  category?: string | null;
};

export function getGetTasksQueryKey(params?: { status?: string }) {
  return ['tasks', params?.status ?? ''];
}

export function useGetTasks(params?: { status?: string }) {
  return useQuery({
    queryKey: getGetTasksQueryKey(params),
    queryFn: () => {
      const qs = params?.status ? `?status=${params.status}` : '';
      return fetchJson<Task[]>(`${BASE_URL}/tasks${qs}`);
    },
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: (variables: { data: Partial<Task> }) =>
      fetchJson<Task>(`${BASE_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(variables.data),
      }),
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: (variables: { taskId: number; data: Partial<Task> }) =>
      fetchJson<Task>(`${BASE_URL}/tasks/${variables.taskId}`, {
        method: 'PUT',
        body: JSON.stringify(variables.data),
      }),
  });
}

export type DashboardSummary = {
  totalEmployees: number;
  employeeChange: number;
  newHires: number;
  newHiresChange: number;
  attendanceRate: number;
  openTasks: number;
};

export type Activity = {
  id: number;
  initials: string;
  color: string;
  text: string;
  timestamp: string;
  kind: string;
};

export type TrendPoint = {
  day: string;
  rate: number;
};

export type AttendanceSummary = {
  rate: number;
  present: number;
  absent: number;
  late: number;
  trend: TrendPoint[];
};

export type DepartmentCount = {
  department: string;
  count: number;
};

export type HiringPoint = {
  label: string;
  value: number;
};

export type ReportsSummary = {
  headcount: number;
  retention: number;
  departments: DepartmentCount[];
  hiring: HiringPoint[];
};

export function useGetDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: () => fetchJson<DashboardSummary>(`${BASE_URL}/dashboard/summary`),
  });
}

export function useGetDashboardActivity() {
  return useQuery({
    queryKey: ['dashboard-activity'],
    queryFn: () => fetchJson<Activity[]>(`${BASE_URL}/dashboard/activity`),
  });
}

export function useGetAttendanceSummary() {
  return useQuery({
    queryKey: ['attendance-summary'],
    queryFn: () => fetchJson<AttendanceSummary>(`${BASE_URL}/attendance/summary`),
  });
}

export function useGetReportsSummary() {
  return useQuery({
    queryKey: ['reports-summary'],
    queryFn: () => fetchJson<ReportsSummary>(`${BASE_URL}/reports/summary`),
  });
}