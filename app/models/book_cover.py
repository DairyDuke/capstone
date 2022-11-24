from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BookCover(db.Model):
    __tablename__ = 'book_covers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")))
    cover_image_url = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Relationship between Covers and Books
    book_parent = db.relationship(
        "Book", back_populates="covered"
    )



    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'bookId': self.book_id,
            'coverImageUrl': self.cover_image_url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
