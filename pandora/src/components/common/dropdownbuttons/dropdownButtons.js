import React from 'react'
import PropTypes from 'prop-types'

const DropdownButtons = ({ buttonDefs }) => {

  const getButtons = () => {
    return buttonDefs.map(d => {
      return (
        <button
          className={'dropdown-item'}
          key={d.id}
          type='button'
          onClick={d.clickHandler}
        >
          {d.text}
        </button>
      )
    })
  }

  return (
    <div className='dropdown'>
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        data-toggle='dropdown'
        aria-haspopup='true'
        aria-expanded='false'
      >
        Actions
      </button>
      <div className='dropdown-menu'>
        {getButtons()}
      </div>
    </div>
  )
}

export default DropdownButtons

DropdownButtons.propTypes = {
  buttonDefs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    clickHandler: PropTypes.func.isRequired
  }))
}