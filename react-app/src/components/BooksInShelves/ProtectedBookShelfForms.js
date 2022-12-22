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
    console.log("bookshelf and bookid", customeBookShelfName, bookId)
    let shelfid = bookshelf["id"]
    console.log("bookshelf object", bookshelf)
    useEffect(()=>{
        if (bookshelf["Stacks"].length > 0) {
           const found = bookshelf["Stacks"].find(book => bookId == book["id"])
           console.log("Found,", found)
            if (found) setShelved(true)
        }
    }, [bookshelf])

    const addBookToShelf = async () => {
        await dispatch(bookActions.addBookToShelfThunk(bookId, shelfid))
        await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        setShowModal(false)
    }
    const removeBookToShelf = async () => {
        await dispatch(bookActions.removeBookFromShelfThunk(bookId, shelfid))
        await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        setShowModal(false)
    }
    return (
        <div id="confirm_delete_form" key={shelfid}>
            <div>
                <span>
                    {customeBookShelfName}
                </span>
            </div>
            <div className="confirm_delete_form_footer">
                {shelved ?
                (<button onClick={() => removeBookToShelf()} className="confirm_delete_submit">REMOVE</button>)
                :
                (<button onClick={() => addBookToShelf()} className='confirm_delete_cancel'>ADD</button>)
                }
            </div>
      </div>
    );
}
