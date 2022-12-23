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
            <div className="bis_shelf_box">
                <div className="bis_protected_box">
                    {protectedShelves}
                </div>
                <div className="bis_custom_box">
                    {otherShelves}
                </div>
            </div>
        </div>
    )
}

export default ShelveBookFormBasic;
