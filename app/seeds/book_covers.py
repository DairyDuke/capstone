from app.models import db, BookCover, environment, SCHEMA

def seed_book_covers():
  # pass

  book1 = BookCover(
    book_id = 1,
    cover_image_url = "https://i.imgur.com/WcyUU0W.jpg"
  )

  book2 = BookCover(
    book_id = 2,
    cover_image_url = "https://i.imgur.com/cdtF0Xw.jpg"
  )

  book3 = BookCover(
    book_id = 3,
    cover_image_url = "https://i.imgur.com/g2ZknTO.jpg"
  )

  db.session.add(book1)
  db.session.add(book2)
  db.session.add(book3)
  db.session.commit()


def undo_book_covers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.book_covers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM book_covers")

    db.session.commit()
