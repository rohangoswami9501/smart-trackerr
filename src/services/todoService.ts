import axios from "axios";
import type{ Todo } from "../types/todo";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${BASE_URL}?_limit=10`);
  return response.data;
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post(BASE_URL, todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await axios.put(`${BASE_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};