from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .books_in_shelve import books_in_shelves

class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    genre = db.Column(db.String(), nullable=False)
    summary = db.Column(db.Text(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Need a way to pull creator data and cover data right away
    creators = db.relationship(
        "Creator", back_populates="books", cascade="all, delete-orphan"
    )

    # rever engineer this:
    #     # This relationship allows you to access both the collection of users
    # # that follow a given user (with user.followers), and the collection
    # # of users that a user follows (with user.following)
    # followers = db.relationship(
    #     "User",
    #     secondary=follows,
    #     primaryjoin=(follows.c.follower_id == id),
    #     secondaryjoin=(follows.c.user_id == id),
    #     backref=db.backref("following", lazy="dynamic"),
    #     lazy="dynamic"
    # )
    # creator_list = db.relationship(
    #     "Book", secondary=
    # )

    # A book can be in many bookshelves, a bookshelf
    # can only contain a book once.
    shelved = db.relationship(
        "Bookshelf", secondary=books_in_shelves, back_populates="stacks"
    )

    # Relationship between Books and Reviews
    reviewed = db.relationship(
        "Review", back_populates="rated", cascade="all, delete-orphan"
    )

    # Relationship between Books and Book Covers
    covered = db.relationship(
        "BookCover", back_populates="book_parent", cascade="all, delete-orphan"
    )



    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'summary': self.summary,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
