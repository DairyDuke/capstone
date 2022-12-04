import React from 'react';
import { Modal } from '../../../context/Modal';
import './DeleteBookshelf.css'
import DeleteBookshelf from '.';

export default function DeleteBookshelfModal({showDeleteModal, setShowDeleteModal, bookshelfid}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='delete_bookshelf_modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteBookshelf bookshelfid={bookshelfid} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}
