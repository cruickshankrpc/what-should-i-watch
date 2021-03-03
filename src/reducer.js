export const initialState = {
  clean: false,
  color: '#ffecea'
};

export const toggleButton = (clean, color) =>  {
  if (!clean) {
    setClean(true)
  } else {
    setClean(false) 
    setColor('lightgray')
  }
}

const reducer = (state, action) => {
  console.log('ACTION>>>', action)

  switch (
    action.type //adding an action type to the switch case
  ) {
    case "SET_TO_CLEAN":
      return {
      ...state, 
      clean: [...state.clean, action.item]
      }
  }
}