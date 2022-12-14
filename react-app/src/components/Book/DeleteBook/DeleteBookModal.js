import React from 'react';
import { Modal } from '../../../context/Modal';
import './DeleteBook.css'
import DeleteBook from '.';

export default function DeleteBookModal({showDeleteModal, setShowDeleteModal, bookid}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='delete_book_modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteBook bookid={bookid} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
