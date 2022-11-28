from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from datetime import datetime
# Models
from app.models import Book, Bookshelf, BookCover, Creator, Review
from app.models.books_in_shelve import books_in_shelve
from app.models.creator_and_book import creator_and_book
# Forms
from app.forms.book_form import BookForm
from app.forms.bookshelf_form import BookshelfForm
from app.forms.creator_form import CreatorForm
from app.forms.review_form import ReviewForm

from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages


book_routes = Blueprint('books', __name__)


# GET - Gets all Books available on website.
@book_routes.route('')
def books():
    pass

# GET - Gets specific Book details.
@book_routes.route('/<int:bookId>')
def book_details(bookId):
    pass

# POST- Creates a new book.
@book_routes.route('/', methods=["POST"])
def create_book():
    pass

# PUT - Edits a current Book entry.
@book_routes.route('/<int:bookId>', methods=["PUT"])
def edit_book(bookId):
    pass

# DELETE - Deletes a current Book entry.
@book_routes.route('/<int:bookId>', methods=["DELETE"])
def delete_book(bookId):
    pass

# ################################################### #
#                 # Bookshelves #                     #
# ################################################### #

# POST - Adds a Book to a User's Bookshelf.
@book_routes.route('/<int:bookId>/bookshelf', methods=["POST"])
def create_bookshelf(bookId):
    pass

# DELETE - Removes a Book from a User's Bookshelf.
@book_routes.route('/<int:bookId>/bookshelf', methods=["DELETE"])
def delete_bookshelf(bookId):
    pass
