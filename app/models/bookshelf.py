from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Bookshelf(db.Model):
    __tablename__ = 'bookshelves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    bookshelf_name = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())




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
