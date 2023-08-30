import csrfFetch from "./csrf";
import * as userActions from "./session"
import { useSelector } from "react-redux";
const SET_PIN = "pins/set_pin"
const REMOVE_PIN = "pins/remove_pin"
const GET_PIN ="pins/get_pin"
const GET_PINS = "pins/getPins";
const getPins = (pins) => {
  return {
    type: GET_PINS,
     pins
  };
};
const set_pin = (pin) => {
  return {
    type: SET_PIN,
    pin
  };
};
const get_pin = (pin) => {
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
export const fetchPins = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins?user_id=${userId}`);
  const data = await response.json();
  // debugger;
  dispatch(getPins(data.pins));
};

export const fetchAllPins=()=> async (dispatch)=>{
  const res= await csrfFetch("/api/pins");
  const data=await res.json();
  dispatch(getPins(data.pins))
}


export const createPin = (formData) => async (dispatch,getState) => {
  debugger
  const response = await csrfFetch('/api/pins', {
    method: 'POST',
    body: formData

  });
  const data = await response.json();
  const sessionUser = getState().session.user
  const updatedUser = { ...sessionUser, pinIds: [...sessionUser.pinIds, data.pin.id] };
  dispatch(set_pin(data.pin)); // Store the new pin in the pinReducer
  dispatch(userActions.setCurrentUser(updatedUser)); // Update the user object with the new pin ID
  return data;
};

export const fetchPin = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${id}`);
  const data = await response.json();
  dispatch(get_pin(data.pin)); 
  // console.log(data)
  return data.pin;
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
  // return response;
};

export const removePin = (id) => async (dispatch,getState) => {
  const response = await csrfFetch(`/api/pins/${id}`, {
    method: "DELETE"
  });
  
  dispatch(remove_pin(id));
  const currentUser = getState().session.user;
  const updatedPinIds = currentUser.pinIds.filter((pinId) => pinId !== id);
  const updatedUser = { ...currentUser, pinIds: updatedPinIds };
  dispatch(userActions.setCurrentUser(updatedUser));
  return response;
};


//   const initialState = {
//     pins: JSON.parse(sessionStorage.getItem("currentPin"))
//   };


const pinReducer = (state = {}, action) => {
  const newState = { ...state }
  switch (action.type) {
    case SET_PIN:
      // debugger
      return { ...state, [action.pin.id]: action.pin };
    case REMOVE_PIN:
      delete newState[action.id]
      return newState;
      case GET_PIN:
        return { ...state, [action.pin.id]: action.pin };
        case GET_PINS:
          return { ...state, ...action.pins };
    default:
      return state;
  }
};

export default pinReducer;