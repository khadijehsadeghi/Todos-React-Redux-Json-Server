import { useDispatch } from 'react-redux'
import { clearCompleted, markAllCompleted } from "../todos/todosSlice"


export default function Actions() {
    const dispatch = useDispatch()
    const onMarkAllCompletedClick = () => dispatch(markAllCompleted())
    const onClearCompletedClick = () => dispatch(clearCompleted())
    return (
        <div className="actions">
            <h5>Actions</h5>
            <button className="btn btn-primary" onClick={onMarkAllCompletedClick}>
                Mark All Completed
            </button>
            <button className="btn btn-primary" onClick={onClearCompletedClick}>
                Clear Completed
            </button>
        </div>
    )
}

