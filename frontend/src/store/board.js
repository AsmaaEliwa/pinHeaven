import csrfFetch from "./csrf";
import * as userActions from "./session"
const SET_BOARD = "boards/set_board";
const REMOVE_BOARD = "boards/remove_board";
const GET_BOARD ="boards/get_board";
const GET_BOARDS= "boards/get_boards";

const get_boards = (boards) => {
    return {
      type: GET_BOARDS,
      boards
    };
  };
  const set_board = (board) => {
    return {
      type: SET_BOARD,
      board
    };
  };
  const get_board = (board) => {
    return {
      type: GET_BOARD,
      board
    };
  };
  
  
  const remove_board = (id) => {
    return {
      type: REMOVE_BOARD,
      id
    };
  };

 


  export const createBoard = (formData) => async (dispatch,getState) => {
    const response = await csrfFetch('/api/boards', {
      method: 'POST',
      body: formData
  
    });
    const data = await response.json();
    const sessionUser = getState().session.user
    const updatedUser = { ...sessionUser, boardIds: [...sessionUser.boardIds, data.board.id] };
    dispatch(set_board(data.board)); 
    dispatch(userActions.setCurrentUser(updatedUser)); 
    return response;
  };


  export const updateBoard = (board) => async (dispatch) => {
    const { title } = board;
    const response = await csrfFetch(`/api/boards/${board.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title
      })
    });
    const data = await response.json();
    dispatch(set_board(data.board));
    // return response;
  };
  
  export const removeBoard = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/boards/${id}`, {
      method: "DELETE"
    });
  
    dispatch(remove_board(id));
    return response;
  };
  
  export const fetchBoards = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/boards?user_id=${userId}`);
    const data = await response.json();
    // debugger;
    dispatch(get_boards(data.boards));
  };

  export const fetchBoard = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/boards/${id}`);
    const data = await response.json();
    dispatch(get_board(data.board)); 
    // console.log(data)
    return data.board;
  };
  

  const BoardReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
      case SET_BOARD:
        // debugger
        return { ...state, [action.board.id]: action.board };
      case REMOVE_BOARD:
        delete newState[action.id]
        return newState;
        case GET_BOARD:
          return { ...state, [action.board.id]: action.board };
          case GET_BOARDS:
            return { ...state, ...action.boards };
      default:
        return state;
    }
  };

  
  export default BoardReducer;