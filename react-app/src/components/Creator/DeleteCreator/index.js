import { useDispatch } from "react-redux"
import { useEffect } from "react"
import * as creatorActions from '../../../store/creator'

const DeleteCreator = ({ creatorId, setShowDeleteModal, showDeleteModal }) => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (showDeleteModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showDeleteModal])

  const deleteCreator = (creatorId) => {
    dispatch(creatorActions.deleteCreatorThunk(creatorId))
  }

  return (
    <div id="confirm_delete_creator_form">
      <div id="confirm_delete_creator_text">
        <h2>Librarian, are you really sure you want to delete this book?</h2>
      </div>
      <div className="confirm_delete_creator_footer">
        <button onClick={() => setShowDeleteModal(false)} className='confirm_delete_creator_cancel'>Cancel</button>
        <button onClick={() => deleteCreator(creatorId)} className="confirm_delete_creator_submit">YES</button>
      </div>
    </div>
  )
}

export default DeleteCreator;
