import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {

    return (
        <button
            onClick={onClick}
            style={{ backgroundColor: color }}
            className='btn'
        >
            {text}
        </button>
    )
}

Button.defaultPorps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}

export default Button