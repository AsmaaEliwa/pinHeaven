import csrfFetch from "./csrf";
const RECEIVE_USER = "users/receiveUser";
export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};
export const fetchUser = (userId) =>async dispatch =>{
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user));
}
export default function userReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
      default:
      return state;
  }
}