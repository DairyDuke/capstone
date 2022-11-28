from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

# from .book_cover import book


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Relationship between Users and Bookshelves
    bookshelf_list = db.relationship(
        "Bookshelf", back_populates="user", cascade="all, delete-orphan"
    )
    # Relationship between Users and Reviews
    reviews = db.relationship(
        "Review", back_populates="author", cascade="all, delete-orphan"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profileImageUrl': self.profile_image_url
        }

    def to_dict_less(self):
        """
        Converts necessary class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'username': self.username,
            'profileImageUrl': self.profile_image_url
        }
