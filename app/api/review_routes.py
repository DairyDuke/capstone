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
@review_routes.route('/<int:reviewId>', methods=["PUT"])
def edit_review(reviewId):
    # pass
    data = request.get_json()
    review_form = ReviewForm()
    review_form['csrf_token'].data = request.cookies['csrf_token']
    try:
        current_review = Review.query.get_or_404(reviewId)
    except:
        return {'errors':{'message': "Book couldn't be found"}}, 404
    else:
        if review_form.validate_on_submit():
            if review_form.data['review_text']:
                current_review.title = review_form.data['review_text']
            if review_form.data['rating']:
                current_review.genre = review_form.data['rating']

            db.session.commit()
            response = current_review.to_dict()
            return response

        return {'errors': validation_errors_to_error_messages(review_form.errors)}, 401


# DELETE - Delete a Review for a Book.
@review_routes.route('/<int:reviewId>', methods=["DELETE"])
def delete_review(reviewId):
    # pass
    try:
        review_to_delete = Review.query.get_or_404(reviewId)
    except:
        return {'message': "Review couldn't be found"}, 404
    else:

        db.session.delete(review_to_delete)
        db.session.commit()
        return {'message': "Successfully deleted"}, 200
