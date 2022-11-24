from .db import db, SCHEMA, add_prefix_for_prod, environment
from datetime import datetime



books_in_shelves = db.Table(
  'books_in_shelves',
  db.Model.metadata,
  db.Column('shelf_id', db.Integer, db.ForeignKey(add_prefix_for_prod('bookshelves.id'))),
  db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'))),
  db.Column('created_at', db.DateTime, default=datetime.utcnow()),
  schema=SCHEMA if environment == "production" else None
)
