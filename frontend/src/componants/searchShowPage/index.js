import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSearchResults } from '../../store/search';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
function SearchPage(){
//    const {query}=useParams()
const dispatch=useDispatch()
   const location = useLocation();
   const searchParams=new URLSearchParams(location.search)
   const query= searchParams.get("query")
   const searchresults=useSelector(state=>Object.values(state.search))
    useEffect(()=>{
        dispatch(fetchSearchResults(query))
    },[])
return (
    <>
    <h1>you found me :) </h1>
    {searchresults.map(item=> <div> {item.title} </div>)}<></>
    </>
)
}
export default SearchPage