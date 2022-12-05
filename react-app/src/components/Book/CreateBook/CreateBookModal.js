import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import CreateBook from './CreateBook';
import "./CreateBook.css";

export default function CreateBookModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id="create_book_modal_button" onClick={() => setShowModal(true)}>
                <p>Create Book</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreateBook setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </>
    );
}
