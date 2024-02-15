import { shallowEqual, useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectFilterdTodoIds } from './todosSlice'


export default function TodoList() {
  const loading = useSelector((state) => state.todos.status);
  const todosIds = useSelector(selectFilterdTodoIds, shallowEqual
  );

  if ("loading" === loading) {
    return (
      <div className="todo-list">
        <div className="loader"></div>
      </div>
    );
  }
  if ("error" === loading) {
    return <div>Error laoding todos</div>;
  }
  const renderedListItems = todosIds.map((id) => {
    return <TodoListItem key={id} id={id} />;
  });
  return <ul className="todo-list">{renderedListItems}</ul>;
}
