import { useSelector, useDispatch } from 'react-redux'
import { statusFilterChanged, selectStatusFilter, StatusFilters } from '../filter/filterSlice'

const StatusFilter = () => {
    const status = useSelector(selectStatusFilter)

    const dispatch = useDispatch()

    function handlChangeStatus(status) {
        dispatch(statusFilterChanged(status))
    }

    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key]
        const className = value === status ? 'selected' : ''

        return (
            <li key={value}>
                <button className={className} onClick={() => handlChangeStatus(value)}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className="filters statusFilters">
            <h5>Filter by Status</h5>
            <ul>{renderedFilters}</ul>
        </div>
    )
}

export default StatusFilter