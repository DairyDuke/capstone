from app.models import db, environment, SCHEMA
from app.models.books_in_shelve import books_in_shelve

def seed_shelving():
    user1 = [
        books_in_shelve(
            shelf_id = 1,
            book_id = 1,
        ),
        books_in_shelve(
            shelf_id = 2,
            book_id = 2,
        ),
        books_in_shelve(
            shelf_id = 3,
            book_id = 3,
        ),
    ]

    user2 = [
        books_in_shelve(
            shelf_id = 5,
            book_id = 1,
        ),
        books_in_shelve(
            shelf_id = 4,
            book_id = 2,
        ),
    ]

    user3 = [
        books_in_shelve(
            shelf_id = 9,
            book_id = 1,
        ),
        books_in_shelve(
            shelf_id = 9,
            book_id = 2,
        ),
        books_in_shelve(
            shelf_id = 8,
            book_id = 3,
        ),
    ]

    for shelf in user1:
        db.session.add(shelf)

    for shelf in user2:
        db.session.add(shelf)

    for shelf in user3:
        db.session.add(shelf)

    db.session.commit()


def undo_shelving():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books_in_shelves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM books_in_shelves")

    db.session.commit()
