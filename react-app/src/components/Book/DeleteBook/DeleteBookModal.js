import React from 'react';
import { Modal } from '../../../context/Modal';

import DeleteBook from '.';

export default function DeleteBookModal({showDeleteModal, setShowDeleteModal, bookid}) {


  return (
      <>
        {showDeleteModal && (
              <Modal id='create-post-modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteBook bookid={bookid.id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
            )}
      </>
  );
}