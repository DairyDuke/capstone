from app.models import db, Bookshelf, environment, SCHEMA

def seed_bookshelves():
  # pass

  user1 = [
    Bookshelf(
              user_id = 1,
              bookshelf_name = 'read'
    ),
    Bookshelf(
              user_id = 1,
              bookshelf_name = 'want to read'
    ),
    Bookshelf(
              user_id = 1,
              bookshelf_name = 'currently reading'
    )
  ]

  user2 = [
    Bookshelf(
              user_id = 2,
              bookshelf_name = 'read'
    ),
    Bookshelf(
              user_id = 2,
              bookshelf_name = 'want to read'
    ),
    Bookshelf(
              user_id = 2,
              bookshelf_name = 'currently reading'
    )
  ]

  user3 = [
    Bookshelf(
              user_id = 3,
              bookshelf_name = 'read'
    ),
    Bookshelf(
              user_id = 3,
              bookshelf_name = 'want to read'
    ),
    Bookshelf(
              user_id = 3,
              bookshelf_name = 'currently reading'
    )
  ]

  for shelf in user1:
      db.session.add(shelf)

  for shelf in user2:
      db.session.add(shelf)

  for shelf in user3:
      db.session.add(shelf)

  db.session.commit()


def undo_bookshelves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM bookshelves")

    db.session.commit()
