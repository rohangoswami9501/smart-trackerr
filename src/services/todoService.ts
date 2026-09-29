import axios from "axios";
import type{ Todo } from "../types/todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${BASE_URL}`);
  console.log(response)
  return response.data;
};

