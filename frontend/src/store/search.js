import csrfFetch from "./csrf";
export const GET_SEARCH_RESULTS="search/getSearchResults"
export const CLEAR_SEARCH_RESULTS="search/clearSearchResults"
export const getSearchResults = (searchResult) => {
    return {
      type: GET_SEARCH_RESULTS,
      searchResult
    };
  };
  export const clearSearchResults = () => {
    return {
      type: CLEAR_SEARCH_RESULTS
      
    };
  };
export const fetchSearchResults = (query) => async (dispatch) => {
    const response = await csrfFetch(`/api/pins/search?query=${query}`);
    const data = await response.json();
    dispatch(getSearchResults(data));
  };
  
  



const searchReducer = (state = {}, action) => {
    const newState = { ...state }
    switch (action.type) {
      case GET_SEARCH_RESULTS:
        return { ...action.searchResult.pins };
        case CLEAR_SEARCH_RESULTS:
            return {};
      default:
        return newState;
    }
  };
  
  export default searchReducer;