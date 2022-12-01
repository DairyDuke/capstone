import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';
import "./SignUpFormModal.css";

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id="login-button" className='signup-login-button' onClick={() => setShowModal(true)}>
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
