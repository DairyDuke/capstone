import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
import CustomBookShelfForms from './CustomBookShelfForms.js'
import ProtectedBookShelfForms from './ProtectedBookShelfForms.js'
import './BooksInShelves.css'

const ShelveBookFormBasic = ({ setShowModal, showModal, currentShelf, bookId }) => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const [currentSelection, setCurrentSelection] = useState(currentShelf || "")
    const [protectedShelf, setProtectedShelf] = useState("")
    const [errors, setErrors] = useState([]);
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
                otherShelves.push(<CustomBookShelfForms setShowModal={setShowModal} showModal={showModal} bookshelf={userBookshelvobj[shelf]} bookId={bookId} />)}
            else {
                protectedShelves.push(<ProtectedBookShelfForms setShowModal={setShowModal} showModal={showModal} bookshelf={userBookshelvobj[shelf]} bookId={bookId} />)}
        }
      }
    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors([]);
    //     if (errors) {

    //     }}


    //     const post = await dispatch(createPost(postData))
    //         .catch(async (response) => {
    //             const data = await response.json();
    //             if (data && data.errors) {
    //                 setErrors(Object.values(data.errors));
    //                 // This console log is to make react happy - do not delete
    //                 console.log("Errors "+errors)
    //             }
    //         });
    //     if (post && !mediaUrl) {
    //         setShowModal(false)
    //         history.push('/feed')
    //         window.scrollTo(0,0)
    //     }
    //     if (post && mediaUrl) {
    //         const postMedia = await dispatch(addMediaByPostId(post.id, mediaUrl))
    //             .catch(async (response) => {
    //                 const data = await response.json();
    //                 if (data && data.errors) {
    //                     setErrors(Object.values(data.errors));
    //                     // This console log is to make react happy - do not delete
    //                     console.log("Errors "+errors)
    //                 }
    //             });
    //         if (postMedia) {
    //             setShowModal(false)
    //             history.push('/feed')
    //             window.scrollTo(0,0)
    //         }
    //     }

    const clickItem =  (e, shelf)=> {
        e.preventDefault()
        setCurrentSelection(shelf)
    }
                // <div className='selector-wrapper' onClick={(e)=> clickItem(e, "read")} >
                //     <div id='text-label'>read</div>
                // </div>
                // <div className='selector-wrapper' onClick={(e)=> clickItem(e, "want to read")}  >

                //     <div id='image-label'>want to read</div>
                // </div>
                // <div className='selector-wrapper' onClick={(e)=> clickItem(e, "currently reading")} >
                //     <div id='quote-label'>currently reading</div>
                // </div>
    return (
        <div>
            <div id='post-type-selector'>
                <div>
                    {protectedShelves}
                </div>
                <div>
                    {otherShelves}
                </div>
            </div>
        </div>
    )
}

export default ShelveBookFormBasic;
