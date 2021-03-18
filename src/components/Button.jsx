import React, {useState} from 'react'

const Button = () => {
  const [clean, setClean] = useState(false);
  const [color, setColor] = useState("#ffecea");

    // Logic to change text & button colour
    function toggleButton() {
      if (!clean) {
        setClean(true);
        // setColor('')
      } else {
        setClean(false);
        setColor("lightgray");
      }
    }

  return (
    <>
      <button
        className="toggle_button_filmPage"
        onClick={toggleButton}
        style={{ backgroundColor: !clean ? "#ffecea" : "lightgray" }}
      >
        {!clean ? "Keep it Clean!" : "Make it Dirty!"}
      </button>
      
    </>
  )
}

export default Button
