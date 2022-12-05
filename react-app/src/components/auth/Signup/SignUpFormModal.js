import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';
import "./SignUpForm.css";

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='signup_button' onClick={() => setShowModal(true)}>
                <p>Sign Up</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <SignUpForm setShowModal={setShowModal} showModal={showModal} />
                </Modal>
            )}
        </>
    );
}
