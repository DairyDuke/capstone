from flask.cli import AppGroup
from .users import seed_users, undo_users
from .book_covers import seed_book_covers, undo_book_covers
from .books import seed_books, undo_books
from .bookshelves import seed_bookshelves, undo_bookshelves
from .creators import seed_creators, undo_creators
from .reviews import seed_reviews, undo_reviews
from .books_in_shelves import seed_shelving, undo_shelving
from .creator_and_book import seed_creator_and_book, undo_creator_and_book

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_creator_and_book()
        # undo_shelving()
        undo_reviews()
        undo_bookshelves()
        undo_creators()
        undo_book_covers()
        undo_books()
        undo_users()
    seed_users()
    seed_books()
    seed_book_covers()
    seed_creators()
    seed_bookshelves()
    seed_reviews()
    # seed_shelving()
    # seed_creator_and_book()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_creator_and_book()
    # undo_shelving()
    undo_reviews()
    undo_bookshelves()
    undo_creators()
    undo_book_covers()
    undo_books()
    undo_users()
    # Add other undo functions here
