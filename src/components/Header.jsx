import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, setShowAddTask, showAddTask }) => {
    const onClick = (e) => {
        setShowAddTask((prevValue) => !prevValue);
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button
                color={showAddTask ? 'red' : 'green'}
                text={showAddTask ? 'Close' : 'Add'}
                onClick={onClick}
            />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypesropTypes = {
    title: PropTypes.string.isRequired,
}

export default Header