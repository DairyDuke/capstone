from app.models import db, Creator, environment, SCHEMA

def seed_creators():
  # pass

  book1 = Creator(
    book_id = 1,
    role='author',
    name='tamsyn muir',
    creator_image_url="https://i.imgur.com/xHHfcf4.jpg",
    summary="TAMSYN MUIR is the bestselling author of the Locked Tomb Trilogy, which begins with Gideon the Ninth, continues with Harrow the Ninth, and concludes with Alecto the Ninth. Her short fiction has been nominated for the Nebula Award, the Shirley Jackson Award, the World Fantasy Award and the Eugie Foster Memorial Award. A Kiwi, she has spent most of her life in Howick, New Zealand, with time living in Waiuku and central Wellington. She currently lives and works in Oxford, in the United Kingdom."
  )
  book2 = Creator(
    book_id = 2,
    role='author',
    name='kisetsu morita',
    creator_image_url="https://i.imgur.com/XlI0gZD.png",
    summary="Japanese author with little publically known about them."
  )
  book3 = Creator(
    book_id = 2,
    role='illustrator',
    name='benio',
    creator_image_url="https://i.imgur.com/XlI0gZD.png",
    summary="Known for illustrations for the Killing Slime light novel series."
  )
  book4 = Creator(
    book_id = 3,
    role='author',
    name='jim butcher',
    creator_image_url="https://i.imgur.com/QWI0Xfe.jpg",
    summary="Jim Butcher is the author of the Dresden Files, the Codex Alera, and a new steampunk series, the Cinder Spires. His resume includes a laundry list of skills which were useful a couple of centuries ago, and he plays guitar quite badly. An avid gamer, he plays tabletop games in varying systems, a variety of video games on PC and console, and LARPs whenever he can make time for it. Jim currently resides mostly inside his own head, but his head can generally be found in his home town of Independence, Missouri."
  )

  db.session.add(book1)
  db.session.add(book2)
  db.session.add(book3)
  db.session.add(book4)
  db.session.commit()


def undo_creators():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.creators RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM creators")

    db.session.commit()
