from app.models import db, Review, environment, SCHEMA

def seed_reviews():
  # pass

  user1 = [
    Review(
          user_id = 1,
          book_id = 1,
          review_text = "I am late in reviewing this, as I finished it over a year ago, but it's a sign of the book's strength that I am still thinking about it! Muir has created a galactic empire upheld by necromancy: Nine houses, each of which governs it own world and specializes in its own form of death magic, all bound together by the Emperor, the immortal Necrolord Prime and his band of super-powerful, undying 'necrosaints' -- the Lyctors.",
          rating = 5.0
    ),
    Review(
          user_id = 1,
          book_id = 3,
          review_text = "The Dresden Files is one of those books that's intimidating to approach. It has a hard-core fan group that will scream its praises from the top of the roof. Usually, I would approach with extreme caution. I rarely read a series when I've been assured that it gets good after six books. When people tell me that, I simply quietly encourage them to read the Fever Series and avert eye contact.",
          rating = 3.0
    )
  ]

  user2 = [
    Review(
          user_id = 2,
          book_id = 1,
          review_text = "I cannot actually believe my hands declared their independence from the auto-control of my brain and gave 3.5 stars and rounded it down to three stars! I can shout at my hands and tell them they are ungrateful! They should have clapped this author’s creativity for this controversial, unique, fantastic plot and good characterization but well, my hands made the right decision! You know why! Okay keep reading and stop yawning in front of me!",
          rating = 3.0
    ),
    Review(
          user_id = 2,
          book_id = 2,
          review_text = "Another fun adventure with my favorite lazy over powered character. I find myself chuckling every time they meet a new character and just happens to look like a young women. If you've enjoyed the other volumes in this cozy Isekai series, you'll love this one also.",
          rating = 5.0
    )
  ]

  user3 = [
    Review(
          user_id = 3,
          book_id = 2,
          review_text = "When I first came to this world, I said I'd live a carefree, laidback life. Recently, I've been thinking about trading the R&R for quality time with my new family, but... Argh! First, Falfa gets stuck in her (admittedly adorable) slime form, then a witch cons me and gets me involved in a huge mess...! Why does this keep happening?!",
          rating = 4.0
    ),
    Review(
          user_id = 3,
          book_id = 3,
          review_text = "Actually, I started with the TV series, for once. And it was a rather atmospheric show with the exception of that charred body too naturalistically (for my liking!) shown, which I managed to watch during my lunch. Totally ruined that freaking lunch! Offputting, that's what it was. And it put me off for, like, 5 years in reading the series. But now I still am here, ready to enjoy this installment to my everlasting paranormal reading addiction. And from the very start this novel feels superb. I think I'll stay with this series for the long run.",
          rating = 5.0
    )
  ]

  for review in user1:
      db.session.add(review)

  for review in user2:
      db.session.add(review)

  for review in user3:
      db.session.add(review)

  db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
