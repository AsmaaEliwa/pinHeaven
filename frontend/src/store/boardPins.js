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
    try {
      const response = await csrfFetch('/api/board_pins', {
        method: 'POST',
        body: JSON.stringify(boardPin),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error creating boardPin:', errorMessage);
      } else {
        const data = await response.json();
        dispatch(set_board_pin(data)); // Store the new pin in the pinReducer
      }
    } catch (error) {
      console.error('Error creating boardPin:', error);
    }
  };
  

  export const fetchBoardPin = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/board_pins/${id}`);
    const data = await response.json();
    dispatch(get_board_pin(data.board_pin)); 
    // console.log(data)
    return data.board_pin;
  };

  export const updateBoardPins = (board_pin) => async (dispatch) => {
    debugger
    const { board_id, pin_id } = board_pin;
    const response = await csrfFetch(`/api/board_pins/${board_pin.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        board_id, pin_id
      })
    });
    const data = await response.json();
    dispatch(set_board_pin(data.board_pin));
  };
  export const updateBoardPin =
  (prevBoardId, pinId, updatedData) => async (dispatch) => {
    debugger
    try {
      const response = await csrfFetch(
        `/api/board_pins/${prevBoardId}/${pinId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error updating BoardPin:", errorMessage);
        throw new Error("Failed to update BoardPin");
      }

      const data = await response.json();
      dispatch(set_board_pin(data.boardPin));
    } catch (error) {
      console.error("Error updating BoardPin:", error);
    }
  };

  // export const removeBoardPin = (boardPin) => async (dispatch, getState) => {
    
  //   const {boardId, pinId}= boardPin
  //   const response = await csrfFetch(`/api/board_pins`, {
  //     method: "DELETE",
  //   });
  // debugger
  //   const user = getState().session.user;
  
  //   if (response.ok) {
  //     dispatch(remove_board_pin(boardId, pinId));
  //     dispatch(fetchBoardPins(user.id));
  //   }
  
  //   return response;
  // };
  export const removePinFromBoard = (boardId, pinId) => async (dispatch) => {
    const response = await csrfFetch(`/api/board_pins`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ board_id: boardId, pin_id: pinId }),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error removing pin from board:", errorMessage);
      throw new Error("Failed to remove pin from board");
    }
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