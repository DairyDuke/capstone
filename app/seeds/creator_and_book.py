from app.models import db, environment, SCHEMA
from app.models.creator_and_book import creator_and_book

def seed_creator_and_book():

  # pass

    book1 = [
      creator_and_book.insert().values(
        creator_id = 1,
        book_id =1
      )
    ]
    book2 = [
      creator_and_book.insert().values(
        creator_id = 2,
        book_id =2
      ),
      creator_and_book.insert().values(
        creator_id = 3,
        book_id =2
      )
      ]
    book3 = [
      creator_and_book.insert().values(
        creator_id = 4,
        book_id =3
      )]

    book4 = [
      creator_and_book.insert().values(
        creator_id = 5,
        book_id =4
      )]

    book5 = [
      creator_and_book.insert().values(
        creator_id = 6,
        book_id =5
      ),
      creator_and_book.insert().values(
        creator_id = 7,
        book_id =5
      )]

    book6 = [
      creator_and_book.insert().values(
        creator_id = 8,
        book_id =6
      )]


    for entry in book1:
        db.session.execute(entry)

    for entry in book2:
        db.session.execute(entry)

    for entry in book3:
        db.session.execute(entry)

    for entry in book4:
        db.session.execute(entry)

    for entry in book5:
        db.session.execute(entry)

    for entry in book6:
        db.session.execute(entry)

    db.session.commit()


def undo_creator_and_book():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.creators_and_books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM creators_and_books")

    db.session.commit()
