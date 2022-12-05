from app.models import db, Creator, environment, SCHEMA

def seed_creators():
  # pass

  book1 = Creator(
    role='author',
    name='tamsyn muir',
    creator_image_url="https://i.imgur.com/xHHfcf4.jpg",
    summary="TAMSYN MUIR is the bestselling author of the Locked Tomb Trilogy, which begins with Gideon the Ninth, continues with Harrow the Ninth, and concludes with Alecto the Ninth. Her short fiction has been nominated for the Nebula Award, the Shirley Jackson Award, the World Fantasy Award and the Eugie Foster Memorial Award. A Kiwi, she has spent most of her life in Howick, New Zealand, with time living in Waiuku and central Wellington. She currently lives and works in Oxford, in the United Kingdom."
  )
  book2 = Creator(
    role='author',
    name='kisetsu morita',
    creator_image_url="https://i.imgur.com/XlI0gZD.png",
    summary="Japanese author with little publically known about them."
  )
  book3 = Creator(
    role='illustrator',
    name='benio',
    creator_image_url="https://i.imgur.com/XlI0gZD.png",
    summary="Known for illustrations for the Killing Slime light novel series."
  )
  book4 = Creator(
    role='author',
    name='jim butcher',
    creator_image_url="https://i.imgur.com/QWI0Xfe.jpg",
    summary="CHARLES SEIFE is a Professor of Journalism at New York University. Formerly a journalist with Science magazine, has also written for New Scientist, Scientific American, The Economist, Science, Wired UK, The Sciences, and numerous other publications. He is the author of Zero: The Biography Of A Dangerous Idea, which won the PEN/Martha Albrand Award for First Nonfiction. He holds an M.S. in mathematics from Yale University and his areas of research include probability theory and artificial intelligence. He lives in Washington D.C."
  )

  book5 = Creator(
    role='author',
    name='charles seife',
    creator_image_url="https://i.imgur.com/FmTJgZQ.jpg",
    summary="Jim Butcher is the author of the Dresden Files, the Codex Alera, and a new steampunk series, the Cinder Spires. His resume includes a laundry list of skills which were useful a couple of centuries ago, and he plays guitar quite badly. An avid gamer, he plays tabletop games in varying systems, a variety of video games on PC and console, and LARPs whenever he can make time for it. Jim currently resides mostly inside his own head, but his head can generally be found in his home town of Independence, Missouri."
  )

  book6 = Creator(
    role='author',
    name='magdalene visaggio',
    creator_image_url="https://i.imgur.com/2fdwagK.jpg",
    summary="Magdalene Visaggio is a comics writer and essayist. She's the writer and creator of the GLAAD and Eisner-nominated series Kim & Kim, as well as Eternity Girl at DC Comics. She currently resides in Manhattan."
  )

  book7 = Creator(
    role='illustrator',
    name='sonny liew',
    creator_image_url="https://i.imgur.com/YXKmIHe.jpg",
    summary="Born in Malaysia, he lives in Singapore, where he sleeps with the fishes."
  )

  book8 = Creator(
    role='author',
    name='william gibson',
    creator_image_url="https://i.imgur.com/aI7FQSK.jpg",
    summary="William Ford Gibson is an American-Canadian writer who has been called the father of the cyberpunk subgenre of science fiction, having coined the term cyberspace in 1982 and popularized it in his first novel, Neuromancer(1984), which has sold more than 6.5 million copies worldwide."
  )

  db.session.add(book1)
  db.session.add(book2)
  db.session.add(book3)
  db.session.add(book4)
  db.session.add(book5)
  db.session.add(book6)
  db.session.add(book7)
  db.session.add(book8)
  db.session.commit()


def undo_creators():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.creators RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM creators")

    db.session.commit()
