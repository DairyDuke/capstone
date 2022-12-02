import React from 'react';
import { Modal } from '../../../context/Modal';

import EditBook from '.';

export default function EditBookModal({showEditModal, setShowEditModal, bookData}) {


  return (
      <>
        {showEditModal && (
              <Modal id='create-post-modal' onClose={() => setShowEditModal(false)} >
                  <EditBook bookData={bookData} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
              </Modal>
            )}
      </>
  );
}
