from app.models import db, Book, environment, SCHEMA

def seed_books():
  # pass

  book1 = Book(
    title='Gideon the Ninth',
    genre='fantasy',
    summary='The Emperor needs necromancers. The Ninth Necromancer needs a swordswoman. Gideon has a sword, some dirty magazines, and no more time for undead nonsense.'
  )

  book2 = Book(
    title="I've Been Killing Slimes for 300 Years and Maxed Out My Level",
    genre='slice of life',
    summary="After living a painful life as an office worker, Azusa ended her short life by dying from overworking. So when she found herself reincarnated as an undying, unaging witch in a new world, she vows to spend her days stress free and as pleasantly as possible. She ekes out a living by hunting down the easiest targets - the slimes! But after centuries of doing this simple job, she's ended up with insane powers...how will she maintain her low key life now?!"
  )

  book3 = Book(
    title='Storm Front',
    genre='modern fantasy',
    summary= "Lost Items Found. Paranormal Investigations. Consulting. Advice. Reasonable Rates. No Love Potions, Endless Purses, or Other Entertainment. Harry Dresden is the best at what he does. Well, technically, he's the only at what he does. So when the Chicago P.D. has a case that transcends mortal creativity or capability, they come to him for answers. For the ''everyday'' world is actually full of strange and magical things—and most don't play well with humans. That's where Harry comes in. Takes a wizard to catch a—well, whatever. There's just one problem. Business, to put it mildly, stinks. So when the police bring him in to consult on a grisly double murder committed with black magic, Harry's seeing dollar signs. But where there's black magic, there's a black mage behind it. And now that mage knows Harry's name. And that's when things start to get interesting. Magic - it can get a guy killed."
  )

  book4 = Book(
    title='Zero: The Biography of a Dangerous Idea',
    genre='nonfiction',
    summary= "The Babylonians invented it, the Greeks banned it, the Hindus worshiped it, and the Church used it to fend off heretics. Now it threatens the foundations of modern physics. For centuries the power of zero savored of the demonic; once harnessed, it became the most important tool in mathematics. For zero, infinity's twin, is not like other numbers. It is both nothing and everything."
  )

  book5 = Book(
    title='Eternity Girl',
    genre='comics',
    summary= "But now, with those days behind her and her powers proving unreliable, Caroline finds herself stuck in a life weighed down by her depression and an inability to change. You see, Caroline is going to live forever, and there is no escape to be had. The very act of living reminds her that to the rest of existence, she is an anomaly. All of that could change, however, when her old foe, Madame Atom, comes to her with an intriguing offer. Madame Atom can give Caroline the power to end her life; she just has to destroy the rest of the world."
  )

  book6 = Book(
    title='Neuromancer',
    genre='science fiction',
    summary= "Henry Dorsett Case was the sharpest data-thief in the business, until vengeful former employees crippled his nervous system. But now a new and very mysterious employer recruits him for a last-chance run. The target: an unthinkably powerful artificial intelligence orbiting Earth in service of the sinister Tessier-Ashpool business clan. With a dead man riding shotgun and Molly, mirror-eyed street-samurai, to watch his back, Case embarks on an adventure that ups the ante on an entire genre of fiction."
  )

  db.session.add(book1)
  db.session.add(book2)
  db.session.add(book3)
  db.session.add(book4)
  db.session.add(book5)
  db.session.add(book6)
  db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM books")

    db.session.commit()
