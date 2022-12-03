import React from 'react';
import { Modal } from '../../../context/Modal';

import EditCreator from '.';

export default function EditCreatorModal({showEditModal, setShowEditModal, creatorData}) {


  return (
      <>
        {showEditModal && (
              <Modal id='create-post-modal' onClose={() => setShowEditModal(false)} >
                  <EditCreator creatorData={creatorData} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
              </Modal>
            )}
      </>
  );
}
