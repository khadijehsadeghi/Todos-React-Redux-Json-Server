import { useDispatch, useSelector } from 'react-redux'
import { colorFilterChanged, selectColorsFilter } from '../filter/filterSlice'

export const availableColors = ['green', 'blue', 'orange', 'purple', 'red']

const ColorFilters = () => {
    const colors = useSelector(selectColorsFilter)
    const dispatch = useDispatch()

    function handlChangeColor(color, changeType) {
        dispatch(colorFilterChanged(color, changeType))
    }

    const renderedColors = availableColors.map((color) => {
        const checked = colors.includes(color)
        const changeType = checked ? 'removed' : 'added'

        return (
            <div className='form-check' key={color}>
                <input
                    className=" form-check-input"
                    type="checkbox"
                    name={color}
                    defaultChecked={checked}
                    onChange={() => handlChangeColor(color, changeType)}
                />
                <span
                    className="color-block"
                    style={{
                        backgroundColor: color,
                    }}
                ></span>
                {color}
            </div>
        )
    })

    return (
        <div className="filters colorFilters">
            <h5>Filter by Color</h5>
            <form className="colorSelection">{renderedColors}</form>
        </div>
    )
}

export default ColorFilters
