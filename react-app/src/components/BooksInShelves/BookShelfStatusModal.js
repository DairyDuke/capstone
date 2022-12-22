import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import ShelveBookFormBasic from './ShelveBookFormBasic.js'
import * as bookshelfActions from '../../store/bookshelf'
import './BooksInShelves.css'

export default function BookShelfStatusModal({bookId, currentShelf}) {
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=> {
        async function checkBookData(bookId) {
          await dispatch(bookshelfActions.getAllCurrentUserBookshelvesThunk())
        }
        checkBookData(bookId)
      },[dispatch])

    return (
        <>
            <div id='booksinshelves_add_button' onClick={() => setShowModal(true)}>
                <div id='booksinshelves_status_box'>
                    <span>
                        {currentShelf}
                    </span>
                </div>
            </div>
            {showModal && (
                <Modal id='booksinshelves_choice_modal' onClose={() => setShowModal(false)} >
                    <ShelveBookFormBasic setShowModal={setShowModal} showModal={showModal} currentShelf={currentShelf} bookId={bookId["bookId"]} />
                    {/* {window.alert("This feature still in progress")} */}
                </Modal>
            )}
        </>
    );
}
