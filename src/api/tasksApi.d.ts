import { TaskCreate, TaskCreateData } from "../pages/tasks/types/Task";
declare class TasksApi {
    private apiUrl;
    constructor(apiUrl?: string);
    fetchAllTasks: () => Promise<any>;
    createTaskData: (userData: TaskCreateData) => Promise<TaskCreate | null>;
    findTaskById: (id: string) => Promise<TaskCreate | null>;
    deleteTaskById: (id: string) => Promise<boolean>;
}
export declare const taskApi: TasksApi;
export {};
//# sourceMappingURL=tasksApi.d.ts.map