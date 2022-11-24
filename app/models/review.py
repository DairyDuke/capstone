from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")))
    review_text = db.Column(db.Text(), nullable=False)
    rating = db.Column(db.Float(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Relationship between Reviews and Users
    author = db.relationship(
        "User", back_populates="reviews"
    )

    # Relationship between Reviews and Books
    rated = db.relationship(
        "Book", back_populates="reviewed"
    )




    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'userId': self.user_id,
            'bookId': self.book_id,
            'reviewText': self.review_text,
            'rating': self.rating,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
