import todosSlice from "../features/todos/todosSlice";
import filterSlice from "../features/filter/filterSlice";
const rootReducer = {
  todos: todosSlice,
  filters: filterSlice,
};
export default rootReducer;
