import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { todoToggled, todoDeleted, colorChanged } from "./todosSlice";


export const availableColors = ['green', 'blue', 'orange', 'purple', 'red']
export const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

export default function TodoListItem({ id }) {
  const todo = useSelector((state) => state.todos.entities[id]);
  const dispatch = useDispatch();
  const { text, completed, color } = todo;
  const colorOptions = availableColors.map((c) => (
    <option value={c} key={c}>
      {capitalize(c)}
    </option >
  ))
  function handleCompletedChanged() {
    dispatch(todoToggled(todo.id))
  }
  function handleDelete() {
    dispatch(todoDeleted(todo.id))
  }
  function handlChangeColor(e) {
    dispatch(colorChanged(todo.id, e.target.value));
  }

  return (
    <li>
      <div className="view">
        <div className="form-check col-6">
          <input
            className=" form-check-input "
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <label className="form-check-label">{text}</label>
        </div>
        <div className="col-6 segment buttons justify-content-end">
          <select
            className="form-select colorPicker"
            defaultValue={color}
            style={{ color: color }}
            onChange={handlChangeColor}
          >
            <option selected>Choose</option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
}
