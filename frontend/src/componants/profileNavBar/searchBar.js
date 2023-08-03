import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults, fetchSearchResults } from '../../store/search';
import { useHistory } from 'react-router-dom';

function SearchBar(){
    const [searchText,setSearchText] =useState()
    const history=useHistory()
    const [timer,setTimer]=useState(0)
    const searchResults=useSelector(state=>Object.values(state.search))
    console.log(searchResults)
    const dispatch= useDispatch()
    function handelSearch(e){
        const query=e.target.value
        setSearchText(query)
        clearTimeout(timer)
        if(query.trim() !== ""){
            setTimer(setTimeout(()=> dispatch(fetchSearchResults(query)),3000))
        }else {
            dispatch(clearSearchResults())
        }
    }
    function handelShowingPin(id){
        return(e)=>{
            e.preventDefault();
            history.push(`/pins/edit/${id}`);
            dispatch(clearSearchResults());
            setSearchText("");
        }
    }
    function handelSubmit(e){
        e.preventDefault();
        if(searchText.trim() !== ""){
            history.push(`/search?query=${searchText}`)
            setSearchText("");
        }
    }
return (
    <div id="searchbar-container">
        <input 
        type="text" 
        id="search-input"
        value={searchText}
        placeholder="Search"
        onChange={handelSearch}
        />
        <button id="search-button" onClick={handelSubmit}>search</button>
       { searchText && searchResults && 
       <ul id="search-dropdown">
           {searchResults.map(result=> <li onClick={handelShowingPin(result.id)} className="search-item"> {result.title}</li>)}
        </ul>
        }
    </div>
)
}
export default SearchBar;