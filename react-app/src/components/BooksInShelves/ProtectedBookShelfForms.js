import React from 'react';
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import * as bookActions from '../../store/book'
import * as bookshelfActions from '../../store/bookshelf'

import './BooksInShelves.css'

export default function ProtectedBookShelfForms({setShowModal, showModal, bookshelf, bookId}) {
    const dispatch = useDispatch()
    const [shelved, setShelved] = useState(false)
    // bookshelfName, id, protected
    let customeBookShelfName = bookshelf["bookshelfName"]
    let shelfid = bookshelf["id"]
    useEffect(()=>{
        if (bookshelf["Stacks"].length > 0) {
           const found = bookshelf["Stacks"].find(book => parseInt(bookId) === parseInt(book["id"]))
            if (found) setShelved(true)
        } else {setShelved(false)}
    }, [bookshelf])

    const addBookToShelf = async () => {
        await dispatch(bookActions.addBookToShelfThunk(bookId, shelfid))
        await dispatch(bookActions.getSingleBookThunk(bookId))
        await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        setShowModal(false)
    }
    const removeBookToShelf = async () => {
        await dispatch(bookActions.removeBookFromShelfThunk(bookId, shelfid))
        await dispatch(bookActions.getSingleBookThunk(bookId))
        await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        setShowModal(false)
    }
    return (
        <div id="bis_protected_container" key={shelfid}>
            <div id="bis_protected_name_box">
                <span>
                    {customeBookShelfName}
                </span>
                {shelved ?
                (<button onClick={() => removeBookToShelf()} className="bis_remove_button">REMOVE</button>)
                :
                (<button onClick={() => addBookToShelf()} className='bis_add_button'>ADD</button>)
                }
            </div>
      </div>
    );
}
