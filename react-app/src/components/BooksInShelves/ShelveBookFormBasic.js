import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import CustomBookShelfForms from './CustomBookShelfForms.js'
import ProtectedBookShelfForms from './ProtectedBookShelfForms.js'
import './BooksInShelves.css'

const ShelveBookFormBasic = ({ setShowModal, showModal, currentShelf, bookId }) => {
    // const user = useSelector(state => state.session.user)
    // const [currentSelection, setCurrentSelection] = useState(currentShelf || "")
    // const [protectedShelf, setProtectedShelf] = useState("")
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const userBookshelvobj = useSelector(state => state.bookshelves.currentUser) || [];

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [showModal])

    useEffect(()=> {
        async function checkBookData(bookId) {
          await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        }
        checkBookData(bookId)
      },[dispatch])
      let protectedShelves = []
      let otherShelves = [];

      if (userBookshelvobj) {
        for (let shelf in userBookshelvobj){
            if (userBookshelvobj[shelf].protected === false){
                otherShelves.push(<CustomBookShelfForms key={shelf} setShowModal={setShowModal} showModal={showModal} bookshelf={userBookshelvobj[shelf]} bookId={bookId} />)}
            else {
                protectedShelves.push(<ProtectedBookShelfForms key={shelf} setShowModal={setShowModal} showModal={showModal} bookshelf={userBookshelvobj[shelf]} bookId={bookId} />)}
        }
      }

    // const clickItem =  (e, shelf)=> {
    //     e.preventDefault()
    //     // setCurrentSelection(shelf)
    // }

    return (
        <div className="bis_shelf_container">
            <div id="bis_shelf_text">
                <h2>Choose a shelf for this book:</h2>
            </div>
            <div className="bis_shelf_box">
                <div className="bis_protected_box">
                <h4>
                    Your Main Shelves:
                </h4>
                    <span>Only one shelf!</span>
                    {protectedShelves}
                </div>
                <div className="bis_custom_box">
                <h4>
                    Your Custom Shelves:
                </h4>
                <span>Put this on as many shelves as you'd like!</span>
                    {otherShelves}
                </div>
            </div>
        </div>
    )
}

export default ShelveBookFormBasic;
