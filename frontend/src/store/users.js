import csrfFetch from "./csrf";
import { REMOVE_BOARD } from "./board";

const RECEIVE_USER = "users/receiveUser";
const RECEIVE_USERS = "users/receiveUsers"
export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};
export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};
export const fetchUser = (userId) => async dispatch => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(receiveUser(data.user));
}



export const fetchUsers = () => async dispatch => {
  const res = await csrfFetch(`/api/users`);
  const data = await res.json();
  dispatch(receiveUsers(data));
}

export default function userReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USERS:
      return { ...newState, ...action.users }
    case REMOVE_BOARD:
      const user = newState[action.userId];
      const boardIdx = user.boardIds.findIndex(id => id === action.boardId);
      user.boardIds.splice(boardIdx, 1);
      newState[action.userId] = user;
      return newState;
    default:
      return state;
  }
}