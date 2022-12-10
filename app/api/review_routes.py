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


review_routes = Blueprint('reviews', __name__)

# PUT - Edit a Review for a Book.
@review_routes.route('/<int:bookId>', methods=["PUT"])
def edit_review(bookId):
    pass

# DELETE - Delete a Review for a Book.
@review_routes.route('/<int:bookId>', methods=["DELETE"])
def delete_review(bookId):
    pass
