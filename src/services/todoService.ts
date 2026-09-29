import axios from "axios";
import type{ Todo } from "../types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${BASE_URL}?_limit=100`);
  return response.data;
};

