import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'
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

    // useEffect(()=> {
    //     async function checkBookData(bookId) {
    //       await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
    //       await dispatch(bookActions.getSingleBookThunk(bookId))
    //       // .then((response)=> console.log('there'))
    //       .catch(async (response) => {
    //         await dispatch(bookActions.removeSingleBookThunk(bookId)).then(async ()=> await dispatch(bookActions.getAllBooksThunk())).then(()=>
    //         history.push('/')
    //         )
    //       })
    //     }
    //     checkBookData(bookId)
    //     // if (bookId) {
    //     //   console.log("Book, ", bookId)
    //     // }
    //     // else {history.push('/')}

    //   },[dispatch, history])

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
    return (
        <>
            <div id='post-type-selector'>
                <div className='selector-wrapper' onClick={(e)=> clickItem(e, "read")} >
                    <div id='text-label'>read</div>
                </div>
                <div className='selector-wrapper' onClick={(e)=> clickItem(e, "want to read")}  >

                    <div id='image-label'>want to read</div>
                </div>
                <div className='selector-wrapper' onClick={(e)=> clickItem(e, "currently reading")} >

                    <div id='quote-label'>currently reading</div>
                </div>
            </div>
        </>
    )
}

export default ShelveBookFormBasic;
