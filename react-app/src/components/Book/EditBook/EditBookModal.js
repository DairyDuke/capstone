import React from 'react';
import { Modal } from '../../../context/Modal';
import './EditBook.css'
import EditBook from '.';

export default function EditBookModal({showEditModal, setShowEditModal, bookData}) {


  return (
      <>
        {showEditModal && (
              <Modal id='edit_book_modal' onClose={() => setShowEditModal(false)} >
                  <EditBook bookData={bookData} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
              </Modal>
            )}
      </>
  );
}
