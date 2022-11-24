from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .books_in_shelve import books_in_shelves


class Bookshelf(db.Model):
    __tablename__ = 'bookshelves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    bookshelf_name = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Relationship between Bookshelves and Users
    user = db.relationship(
        "User", back_populates="bookshelf_list"
    )

    # A bookshelf can have many books, a single book
    # can only be in a bookshelf once
    stacks = db.relationship(
        "Book", secondary=books_in_shelves, back_populates="shelved"
    )


    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'bookshelfName': self.bookshelf_name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
