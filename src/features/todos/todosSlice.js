import { createSelector, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { StatusFilters } from "../filter/filterSlice";


const initialState = {
  status: "idle",
  entities: {},
};
// start createSlice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggled(state, action) {
      const toggledTodoId = action.payload
      state.entities[toggledTodoId].completed = !state.entities[toggledTodoId].completed
    },
    todoDeleted(state, action) {
      const deletedTodoId = action.payload
      delete state.entities[deletedTodoId]
    },
    markAllCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        state.entities[todo.id].completed = true;
      })
    },
    clearCompleted(state) {
      Object.values(state.entities).forEach((todo) => {
        if (todo.completed) {
          delete state.entities[todo.id];
        }
      });
    },
    colorChanged: {
      reducer(state, action) {
        const { color, id } = action.payload
        state.entities[id].color = color
      },
      prepare(todoId, color) {
        return {
          payload: {
            id: todoId,
            color
          }
        }
      }
    }
  },
});
export const { todoAdded, todoToggled, todoDeleted, colorChanged, markAllCompleted, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;

// thunk function

export const saveNewTodo = (text) => {
  return async function saveNewTodoThunk(dispatch) {
    const initTodo = {
      text,
      completed: false
    };
    const todo = await client.post("http://localhost:5000/todos", initTodo);
    dispatch(todoAdded(todo));
  };
};

const todosLoadingStarted = (todos) => ({
  type: "todos/todosLoadingStarted",
});

const todosLoadedSuccess = (todos) => ({
  type: "todos/todosLoadedSuccess",
  payload: todos,
});

const todosLoadedFailes = () => ({
  type: "todos/todosLoadedFailes",
});
export const fetchTodos = (dispatch, getState) => {
  dispatch(todosLoadingStarted());
  client
    .get("http://localhost:5000/todos")
    .then((todos) => {
      dispatch(todosLoadedSuccess(todos));
    })
    .catch((error) => todosLoadedFailes());
};

//selects function
export const selectTodosIds = (state) => Object.keys(state.todos.entities);

export const selectTodoEntities = (state) => state.todos.entities;
export const selectTodos = createSelector(selectTodoEntities, (todoEntities) =>
  Object.values(todoEntities)
);
const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAll = status === StatusFilters.All;
    if (showAll && colors.length === 0) {
      return todos
    }
    const showCompleted = status === StatusFilters.Completed;
    return todos.filter((todo) => {
      const statusFilter = showAll || todo.completed === showCompleted;
      const colorsFilter = colors.length === 0 || colors.includes(todo.color)
      return statusFilter && colorsFilter;
    })
  }
)

export const selectFilterdTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);
