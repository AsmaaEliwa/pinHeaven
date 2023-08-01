import csrfFetch from "./csrf";
import * as userActions from "./session"
import { useSelector } from "react-redux";
const SET_BOARD_PIN = "board_pins/set_board_pin"
const REMOVE_BOARD_PIN = "board_pins/remove_board_pin"
const GET_BOARD_PIN ="board_pins/get_board_pin"
const GET_BOARD_PINS = "board_pins/get_board_pins";
const get_board_pins = (board_pins) => {
  return {
    type: GET_BOARD_PINS,
    board_pins
  };
};
const set_board_pin = (board_pin) => {
  return {
    type: SET_BOARD_PIN,
    board_pin
  };
};
const get_board_pin = (board_pin) => {
  return {
    type: SET_BOARD_PIN,
    board_pin
  };
};


const remove_board_pin = (id) => {
  return {
    type: REMOVE_BOARD_PIN,
    id
  };
};


export const fetchBoardPins = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/board_pins?user_id=${userId}`);
    const data = await response.json();
    // debugger;
    dispatch(get_board_pins(data));
  };
  
 
  export const createBoardPin = (boardPin) => async (dispatch) => {
    const response = await csrfFetch('/api/board_pins', {
      method: 'POST',
      body: JSON.stringify(boardPin)
  
    });
    const data = await response.json();
    dispatch(set_board_pin(data)); // Store the new pin in the pinReducer
  };

  export const fetchBoardPin = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/board_pins/${id}`);
    const data = await response.json();
    dispatch(get_board_pin(data.board_pin)); 
    // console.log(data)
    return data.board_pin;
  };

  export const updatePin = (board_pin) => async (dispatch) => {
    const { board_id, pin_id } = board_pin;
    const response = await csrfFetch(`/api/board_pins/${board_pin.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        board_id, pin_id
      })
    });
    const data = await response.json();
    dispatch(set_board_pin(data.board_pin));
    // return response;
  };
  export const removePin = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/board_pins/${id}`, {
      method: "DELETE"
    });
  
    dispatch(remove_board_pin(id));
    return response;
  };
  
  const boardPinReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
      case SET_BOARD_PIN:
        return { ...state, ...action.board_pin };
      case REMOVE_BOARD_PIN:
        delete newState[action.id]
        return newState;
        case GET_BOARD_PIN:
          return { ...state, [action.board_pin.id]: action.board_pin };
          case GET_BOARD_PINS:
            return { ...state, ...action.board_pins };
      default:
        return state;
    }
  };
  
  export default boardPinReducer;