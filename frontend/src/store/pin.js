import csrfFetch from "./csrf";
const SET_PIN = "pins/set_pin"
const REMOVE_PIN = "pins/remove_pin"

const set_pin = (pin) => {
  return {
    type: SET_PIN,
    pin
  };
};


const remove_pin = (id) => {
  return {
    type: REMOVE_PIN,
    id
  };
};

//   const sessionUser = useSelector(state=> state.session.user)


export const createPin = (pin) => async (dispatch) => {
  const response = await csrfFetch('/api/pins', {
    method: 'POST',
    body: pin

  });
  const data = await response.json();
  debugger;
  dispatch(set_pin(data.pin));
  return response;
};


export const updatePin = (pin) => async (dispatch) => {
  const { title, description } = pin;
  const response = await csrfFetch(`/api/pins/${pin.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title, description
    })
  });
  const data = await response.json();
  dispatch(set_pin(data.pin));
  return response;
};

export const removePin = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins${id}`, {
    method: "DELETE"
  });

  dispatch(remove_pin());
  return response;
};


//   const initialState = {
//     pins: JSON.parse(sessionStorage.getItem("currentPin"))
//   };

const pinReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case SET_PIN:
      debugger
      return { ...state, [action.pin.id]: action.pin };
    case REMOVE_PIN:
      delete newState[action.id]
      return newState;
    default:
      return state;
  }
};

export default pinReducer;