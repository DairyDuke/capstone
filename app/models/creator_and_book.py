from .db import db, SCHEMA, add_prefix_for_prod, environment
from datetime import datetime



creator_and_book = db.Table(
  'creators_and_books',
  db.Model.metadata,
  db.Column('creator_id', db.Integer, db.ForeignKey(add_prefix_for_prod('creators.id'))),
  db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'))),
  db.Column('created_at', db.DateTime, default=datetime.utcnow()),
  schema=SCHEMA if environment == "production" else None
)
