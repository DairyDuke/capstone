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


bookshelf_routes = Blueprint('bookshelves', __name__)


# GET - Get all Bookshelves owned by current User.
@bookshelf_routes.route('')
def bookshelves():
    pass

# GET - Get specific Bookshelf details.
@bookshelf_routes.route('/<int:shelfId>')
def bookshelf_details(shelfId):
    pass

# POST- CCreate a new Bookshelf.
@bookshelf_routes.route('/', methods=["POST"])
def create_bookshelf():
    pass

# PUT - Update a Bookshelf name.
@bookshelf_routes.route('/<int:shelfId>', methods=["PUT"])
def edit_bookshelf(shelfId):
    pass

# DELETE - Delete a Bookshelf.
@bookshelf_routes.route('/<int:shelfId>', methods=["DELETE"])
def delete_bookshelf(shelfId):
    pass
