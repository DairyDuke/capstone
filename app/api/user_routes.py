from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from datetime import datetime
# Models
from app.models import db, Book, Bookshelf, BookCover, Creator, Review
from app.models.books_in_shelve import books_in_shelve
from app.models.creator_and_book import creator_and_book
# Forms
from app.forms.book_form import BookForm
from app.forms.bookshelf_form import BookshelfForm
from app.forms.creator_form import CreatorForm
from app.forms.review_form import ReviewForm

from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# # ################################################### #
# #            # Get all Bookshelves #                  #
# # ################################################### #

# @user_routes.route('/<int:id>/bookshelves')
@user_routes.route('/current/bookshelves')
# @login_required
def user_bookshelves():
    """
    Query for all bookshelves owned by a user
    """
    response = {
        "Bookshelves": []
    }
    try:
        current_user.get_id()
    except:
        return response
    bookshelves = Bookshelf.query.order_by(Bookshelf.id.desc()).options(joinedload(Bookshelf.stacks),joinedload(Bookshelf.user)).filter_by(user_id=current_user.get_id()).all()


    for shelf in bookshelves:
        shelf_dict = shelf.to_dict()
        shelf_stack_list = [stack.to_dict() for stack in shelf.stacks]
        shelf_dict['Stacks'] = shelf_stack_list
        response["Bookshelves"].append(shelf_dict)

    return response
