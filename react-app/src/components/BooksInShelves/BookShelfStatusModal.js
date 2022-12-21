import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import './BooksInShelves.css'

export default function BookShelfStatusModal({bookId, currentShelf}) {
    const [showModal, setShowModal] = useState(false);

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
                    {/* <ShelveBookForm setShowModal={setShowModal} showModal={showModal} currentShelf={currentShelf} bookId={bookId} /> */}
                    {window.alert("This feature still in progress")}
                </Modal>
            )}
        </>
    );
}
