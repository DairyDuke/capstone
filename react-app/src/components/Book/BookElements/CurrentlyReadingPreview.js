


const CurrentlyReadingPreview = ({book}) => {
  // need to pull books, then pull author/creator
  // title, summary, id, genre, createdAt, updatedAt
  if (!book) {
    return (
      <>
      </>
    )
  } else {
  return (
    <div className="currently_reading_preview_container">
      <a><img src={book.Cover} alt={book.title} /></a>
      <div className="currently_reading_preview_info_box">
        <div className="currently_reading_preview_book_title">
          {book.title}
        </div>
        <div className="currently_reading_preview_author_name">
          by {book.creator}
        </div>
        <div className="currently_reading_preview_summary">
          {book.summary}
        </div>
      </div>
    </div>
  )
}
}
export default CurrentlyReadingPreview
