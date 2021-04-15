import React, {useState} from 'react'

const Button = (props) => {

  return (
    <>
      <button
        className="toggle_button_filmPage"
        isToggled={props.toggleButton}
      >
      </button>
      
    </>
  )
}

export default Button
