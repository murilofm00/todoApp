import axios from "axios";
import TodoItem from "../models/TodoItem";

axios.defaults.baseURL = "https://localhost:5001";
export default class TodoController {
  getAll() {
    return axios.get("/api/TodoItems/");
  }

  updateItem(item: TodoItem) {
    return axios.put(`/api/TodoItems/${item.id}`, item);
  }

  deleteItem(id: number) {
    return axios.delete(`api/TodoItems/${id}`);
  }

  addItem(item: TodoItemDTO) {
    return axios.post("/api/TodoItems/", item);
  }
}

interface TodoItemDTO {
  name: string;
  isComplete: boolean;
}
