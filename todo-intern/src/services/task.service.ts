import { ITask } from "@/libs/types";
import HttpInterceptor from "./httpInterceptor";

const http = new HttpInterceptor();

interface ApiResponse<T> {
  data: T | null;
  status: number;
  statusText: string;
}

export const getTaskDetails = async (
  callback: (response: ApiResponse<ITask[]>) => void
): Promise<void> => {
  const endpoint = `${process.env.api_base_url}/tasks/`;
  try {
    const response = await http.get<ITask[]>(endpoint);
    callback({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error: any) {
    const fallbackResponse: ApiResponse<ITask[]> = {
      data: null,
      status: error.response?.status || 500,
      statusText:
        error.response?.statusText ||
        "An error occurred while fetching Tasks.",
    };
    callback(fallbackResponse);
  }
};

export const addTask = async (
  task: ITask,
  callback: (response: ApiResponse<ITask>) => void
): Promise<void> => {
  const endpoint = `${process.env.api_base_url}/task`;
  try {
    const response = await http.post<ITask>(endpoint, task);
    callback({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error: any) {
    const fallbackResponse: ApiResponse<ITask> = {
      data: null,
      status: error.response?.status || 500,
      statusText:
        error.response?.statusText ||
        "An error occurred while adding the Tasks.",
    };
    callback(fallbackResponse);
  }
};

export const updateTask = async (
  taskId: string,
  task: ITask,
  callback: (response: ApiResponse<ITask>) => void
): Promise<void> => {
  const endpoint = `${process.env.api_base_url}/task/${taskId}`;
  try {
    const response = await http.put<ITask>(endpoint, task);
    callback({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error: any) {
    const fallbackResponse: ApiResponse<ITask> = {
      data: null,
      status: error.response?.status || 500,
      statusText:
        error.response?.statusText ||
        "An error occurred while updating the Tasks.",
    };
    callback(fallbackResponse);
  }
};

export const deleteTask = async (
  taskId: string,
  callback: (response: ApiResponse<null>) => void
): Promise<void> => {
  const endpoint = `${process.env.api_base_url}/task/${taskId}`;
  try {
    const response = await http.delete<null>(endpoint);
    callback({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  } catch (error: any) {
    const fallbackResponse: ApiResponse<null> = {
      data: null,
      status: error.response?.status || 500,
      statusText:
        error.response?.statusText ||
        "An error occurred while deleting the Tasks.",
    };
    callback(fallbackResponse);
  }
};