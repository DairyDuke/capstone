import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import ShelveBookFormBasic from './ShelveBookFormBasic.js'
import './BooksInShelves.css'

export default function BookShelfStatusModal({bookId, currentShelf}) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div id='booksinshelves_add_button' onClick={() => setShowModal(true)}>
                <div id='booksinshelves_status_box'>
                    <span>
                        {currentShelf.bookshelfName}
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
