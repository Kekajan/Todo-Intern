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
        "An error occurred while fetching movies.",
    };
    callback(fallbackResponse);
  }
};

export const addMovie = async (
  movie: ITask,
  callback: (response: ApiResponse<ITask>) => void
): Promise<void> => {
  const endpoint = `${process.env.api_base_url}/task`;
  try {
    const response = await http.post<ITask>(endpoint, movie);
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
        "An error occurred while adding the movie.",
    };
    callback(fallbackResponse);
  }
};

// export const updateMovie = async (
//   movieId: string,
//   movie: IMovie,
//   callback: (response: ApiResponse<IMovie>) => void
// ): Promise<void> => {
//   const endpoint = `${process.env.api_base_url}/movie/${movieId}`;
//   try {
//     const response = await http.put<IMovie>(endpoint, movie);
//     callback({
//       data: response.data,
//       status: response.status,
//       statusText: response.statusText,
//     });
//   } catch (error: any) {
//     const fallbackResponse: ApiResponse<IMovie> = {
//       data: null,
//       status: error.response?.status || 500,
//       statusText:
//         error.response?.statusText ||
//         "An error occurred while updating the movie.",
//     };
//     callback(fallbackResponse);
//   }
// };

// export const deleteMovie = async (
//   movieId: string,
//   callback: (response: ApiResponse<null>) => void
// ): Promise<void> => {
//   const endpoint = `${process.env.api_base_url}/movie/${movieId}`;
//   try {
//     const response = await http.delete<null>(endpoint);
//     callback({
//       data: response.data,
//       status: response.status,
//       statusText: response.statusText,
//     });
//   } catch (error: any) {
//     const fallbackResponse: ApiResponse<null> = {
//       data: null,
//       status: error.response?.status || 500,
//       statusText:
//         error.response?.statusText ||
//         "An error occurred while deleting the movie.",
//     };
//     callback(fallbackResponse);
//   }
// };