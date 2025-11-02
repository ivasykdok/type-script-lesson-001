export class ApiService {
  private apiUrl: string;

  constructor(apiUrl: string = "http://localhost:3000/tasks") {}

  async fetchAllTasks() {
    return "fetch all";
  }
}
export default ApiService;
