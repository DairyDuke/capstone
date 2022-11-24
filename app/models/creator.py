from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Creator(db.Model):
    __tablename__ = 'creators'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("books.id")))
    role = db.Column(db.String(), nullable=False)
    name = db.Column(db.String(), nullable=False)
    creator_image_url = db.Column(db.String(), nullable=False)
    summary = db.Column(db.Text())
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Relationship between Creators and Books
    books = db.relationship(
        "Book", back_populates="creators", cascade="all, delete-orphan"
    )


    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'bookId': self.book_id,
            'role': self.role,
            'name': self.name,
            'creatorImageUrl': self.creator_image_url,
            'summary': self.summary,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
