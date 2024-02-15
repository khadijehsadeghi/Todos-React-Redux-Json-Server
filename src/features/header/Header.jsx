import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

export default function Header() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const handleChanges = (e) => setText(e.target.value);
  const handleKeyDown = async (e) => {
    const trimmedText = text.trim();
    if (e.which === 13 && trimmedText) {
      setStatus("loading");

      await dispatch(saveNewTodo(trimmedText));

      setText("");
      setStatus("idle");
    }
  };

  const isLoading = "loading" === status;
  const placeholder = isLoading ? "" : "What needs to be done?";
  const loader = isLoading ? <div className="loader"></div> : null;

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        value={text}
        onChange={handleChanges}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  );
}
