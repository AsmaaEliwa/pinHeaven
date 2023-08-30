import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as pinActions from "../../store/pin"
import * as userAction from "../../store/users"
import * as boardActions from "../../store/board"
import * as boardPinActions from "../../store/boardPins"
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PinModal from "../pinModal/index"
import { useHistory } from 'react-router-dom';
function ProfileHome() {
    const dispatch = useDispatch()
    const user= useSelector(state=>state.session.user)
    const pins = useSelector(state => Object.values(state.pin))
    const boards= useSelector(state=>Object.values(state.boards))
    const [showPinInfo, setShowPinInfo] = useState(false)
    const [selectedPin, setSelectedPin] = useState(null)
    const [selectedBoard,setSelectedBoard]=useState(boards[0]?.id || null)
    // console.log(selectedPin)
    const history=useHistory()
    const size= ["small","medium","large"]
    useEffect(() => {
        dispatch(pinActions.fetchAllPins())
        dispatch(userAction.fetchUsers())
        dispatch(boardActions.fetchBoards(user.id))
    }, [])
    function handelShowPinInfo(pin) {
        setShowPinInfo(true)
        setSelectedPin(pin)


    }
    function handelModalClose() {
        setShowPinInfo(false);
    }

    const users = useSelector(state => {
        return state.users || null
    })

    function handdelSelectBoard(e){
        e.stopPropagation()
        e.preventDefault()
        setSelectedBoard(e.target.value)
    }
    function getImageNameFromUrl(imageUrl) {
        try {
          const url = new URL(imageUrl);
          const pathname = url.pathname;
          const parts = pathname.split('/');
          const imageName = parts[parts.length - 1];
          return imageName;
        } catch (error) {
          console.error('Error parsing imageUrl:', error);
          return null; // Return null or handle the error as needed
        }
      }
    function handelSavePin(e, pin) {
        e.stopPropagation();
        e.preventDefault();
     debugger
        // const image = pin.imgUrl; 
        // fetch(`/proxy-image?imageUrl=${encodeURIComponent(image)}`)
        //   .then((response) => {
        //     //   debugger
        //     console.log(response)
        //     return response.blob()
        //   }
        //   )
        //   .then((blob) => {
             
            // Create a File from the Blob
            // const filename = image.substring(image.lastIndexOf('/') + 1);
            // const name= getImageNameFromUrl(image)
            // const file = new File([blob],name+".png", { type:"image/jpeg" });
            // const formData = new FormData();
            // formData.append("pin[description]", pin.description);
            // formData.append("pin[user_id]", user.id);
            // formData.append("pin[title]", pin.title);
            // formData.append("pin[image]", file);
            // debugger
            // dispatch(pinActions.createPin(formData))
            //   .then((res) => {
            //     const pinId = Object.values(res)[0].id;
            if(Object.keys(boards).length===0){
              const formData = new FormData();
              formData.append("board[title]","All Pins" );
              formData.append("board[user_id]", user.id);
             
              dispatch(boardActions.createBoard(formData))
              .then((createdBoard) => {
                
                const createdBoardId = createdBoard.id;
                dispatch(boardPinActions.createBoardPin({ pinId: pin.id, boardId: createdBoardId }));
              });

            }else{
              dispatch(boardPinActions.createBoardPin({ pinId:pin.id, boardId: selectedBoard }));

            }
                history.push(`/users/${user.id}`);
              // });
          // })
  
      }
      
      
      

    
    const getUserById = (userId) => {

        return users[userId] || null;
    };
    if (!pins[0]) return null
    if (!users) {
        return <p>Loading...</p>;
    }
 


    return (
        <>
       <div className='pinscontainer'>
  {pins[0] &&
    pins?.map((pin, index) => (
      <div key={pin.id} className={`allPins ${size[index % size.length]}`}>
        <img className="allPinImg" src={pin?.imgUrl} alt="Pin" />
        <div className="image-overlay" onClick={() => handelShowPinInfo(pin)}>
          <div className='hidden'>
            <form className='space' onSubmit={(e)=>handelSavePin(e,pin)}>
              <select
                className='save-select'
                onChange={handdelSelectBoard}
                onClick={(e) => e.stopPropagation()} 
              >
                {boards?.map(board => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
              <button className='save-btn' type='submit'>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    ))}
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
export default ProfileHome