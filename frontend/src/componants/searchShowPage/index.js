import { useEffect,useState } from 'react';
import { useLocation, useParams, NavLink } from 'react-router-dom';
import { fetchSearchResults } from '../../store/search';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PinModal from "../pinModal/index"
function SearchPage(){
    const [showPinInfo, setShowPinInfo] = useState(false)
    const [selectedPin, setSelectedPin] = useState(null)
    const dispatch=useDispatch()
   const location = useLocation();
   const size= ["small","medium","large"]
   const searchParams=new URLSearchParams(location.search)
   const query= searchParams.get("query")
   const searchresults=useSelector(state=>Object.values(state.search))
    useEffect(()=>{
        dispatch(fetchSearchResults(query))
    },[])
    function handelShowPinInfo(pin) {
        setShowPinInfo(true)
        setSelectedPin(pin)
        // debugger

    }
    function handelModalClose() {
        setShowPinInfo(false);
    }

    const users = useSelector(state => {
        return state.users || null
    })
    const getUserById = (userId) => {

        return users[userId] || null;
    };
    console.log(searchresults)
return (
    <>
    <div className='pinscontainer'>
    {searchresults.map((pin,index)=>
          <div key={pin.id} className={`allPins ${size[index % size.length]}`}>
            <img className="allPinImg" src={pin?.imgUrl} alt="Pin" />
            <div className="image-overlay" onClick={() => handelShowPinInfo(pin)}></div>
          </div>
        
   ) }
    </div>
    {showPinInfo &&
                <PinModal onClose={handelModalClose} className="pinshow">
                    <div className='pinInfo'>
                        <div>
                            <img className='allPinImg' src={selectedPin.imgUrl} />
                        </div>
                        <div className='info'>
                            <h2 className='pinT'>{selectedPin.title}</h2>
                            <p>{selectedPin.description}</p>

                            <NavLink to={`/users/${selectedPin.userId}`}  className="visituser"> <div className='firstlitter'>{getUserById(selectedPin.userId).username[0].toUpperCase()} </div>      <div className='pinCreator'>{getUserById(selectedPin.userId).username}</div></NavLink>

                        </div>
                    </div>
                </PinModal>
            }
        </>
    
)
}
export default SearchPage