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


bookshelf_routes = Blueprint('bookshelves', __name__)


# GET - Get all Bookshelves
@bookshelf_routes.route('', methods=["GET"])
# @login_required
def bookshelves():
    # pass
    bookshelves = Bookshelf.query.order_by(Bookshelf.id.desc()).options(joinedload(Bookshelf.stacks),joinedload(Bookshelf.user)).all()
    response = {
        "Bookshelves": []
    }

    for shelf in bookshelves:
        shelf_dict = shelf.to_dict()
        shelf_stack_list = [stack.to_dict() for stack in shelf.stacks]
        shelf_dict['Stacks'] = shelf_stack_list
        response["Bookshelves"].append(shelf_dict)

    return response

# GET - Get specific Bookshelf details.
@bookshelf_routes.route('/<int:shelfId>')
@login_required
def bookshelf_details(shelfId):
    # pass
    single_shelf = Bookshelf.query.order_by(Bookshelf.created_at.desc()).options(joinedload(Bookshelf.stacks), joinedload(Bookshelf.user)).get_or_404(shelfId)

    response = {
        "Bookshelfes": []
    }
    shelf_dict = single_shelf.to_dict()
    shelf_user_list = single_shelf.user.to_dict()
    shelf_stack_list = [stack.to_dict() for stack in single_shelf.stacks]
    shelf_dict['Users'] = shelf_user_list
    shelf_dict['Stacks'] = shelf_stack_list

    return shelf_dict


# POST- Create a new Bookshelf.
@bookshelf_routes.route('', methods=["POST"])
@login_required
def create_bookshelf():
    # pass
    shelf_form = BookshelfForm()
    shelf_form['csrf_token'].data = request.cookies['csrf_token']

    try:
        new_shelf = Bookshelf.query.filter_by(bookshelf_name=shelf_form.data['bookshelf_name'], user_id=current_user.get_id()).all()
        if not new_shelf:
            raise Exception()
    except:
        if shelf_form.validate_on_submit():
            new_shelf_create= Bookshelf(
                user_id= current_user.get_id(),
                bookshelf_name= shelf_form.data['bookshelf_name']
            )
            db.session.add(new_shelf_create)
            db.session.commit()
            shelf_dict = new_shelf_create.to_dict()
            return shelf_dict
        return {'errors': validation_errors_to_error_messages(shelf_form.errors)}, 401
    else:
        return {'message': "Shelf already exists!"}, 300



# PUT - Update a Bookshelf name.
@bookshelf_routes.route('/<int:shelfId>', methods=["PUT"])
@login_required
def edit_bookshelf(shelfId):
    # pass
    shelf_form = BookshelfForm()
    shelf_form['csrf_token'].data = request.cookies['csrf_token']

    try:
        current_shelf = Bookshelf.query.get_or_404(shelfId)
        if int(current_shelf.user_id) != int(current_user.get_id()):
            raise
    except:
        return {'message': "Shelf does not exists!"}, 404

    current_shelf_dict = current_shelf.to_dict()
    try:
       if current_shelf.protected == True:
            raise TypeError()

    except TypeError:
            return {'message': "Read, Want to read, Currently Reading shelves can not be edited!"}, 403
    else:
        if shelf_form.validate_on_submit():
            if shelf_form.data['bookshelfName'] and current_shelf.bookshelf_name != shelf_form.data['bookshelfName']:
                current_shelf.bookshelf_name = shelf_form.data['bookshelfName']
                db.session.commit()
            else:
                return {'message': "Nothing Changed!"}, 300
            shelf_dict = current_shelf.to_dict()
            return shelf_dict
        return {'errors': validation_errors_to_error_messages(shelf_form.errors)}, 401

# DELETE - Delete a Bookshelf.
@bookshelf_routes.route('/<int:shelfId>', methods=["DELETE"])
@login_required
def delete_bookshelf(shelfId):

    try:
        current_shelf = Bookshelf.query.get_or_404(shelfId)
        if int(current_shelf.user_id) != int(current_user.get_id()):
            raise Exception()
    except:
        return {'message': "Shelf does not exists!"}, 404

    current_shelf_dict = current_shelf.to_dict()
    try:
       if current_shelf.protected == True:
            raise TypeError()

    except TypeError:
            return {'message': "Read, Want to read, Currently Reading shelves can not be edited!"}, 403
    else:
        bookshelf_name = current_shelf.bookshelf_name
        bookshelf_id = current_shelf.id
        db.session.delete(current_shelf)
        db.session.commit()
        return {'message': "Successfully deleted", "bookshelf_name": bookshelf_name, "bookshelf_id": bookshelf_id}, 200
