import { actionType, ToDo } from "../types";

interface toDo {
  id: string;
  title: string;
  isDone: boolean;
}
const initState: ToDo = [];
function reducer(state = initState, action: actionType) {
  switch (action.type) {
    case "add_todo":
      return [...state, action.data];
    case "deleteTodo":
      const copyState = JSON.parse(JSON.stringify(state));
      return copyState.filter((item: toDo) => item.id !== action.data.id);
    case "changeIsDone":
      return state.map((item: toDo) =>
        item.id === action.data.id ? { ...item, isDone: !item.isDone } : item
      );
    case "changeAll":
      return state.map((item: toDo) => ({ ...item, isDone: action.data }));
    default:
      return state;
  }
}
export default reducer;
