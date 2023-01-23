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


creator_routes = Blueprint('creators', __name__)

# default creator image: https://i.imgur.com/XlI0gZD.png
@creator_routes.route('', methods=["GET"])
def all_creators():
    # pass
    """
    Queries the Database for creator,
    if Creator is found, compares/updates
    Queries the database and returns all Creators.
    """
    # author_details = request.json()
    creators = Creator.query.order_by(Creator.role.desc()).options(joinedload(Creator.books)).all()

    response = {
      "Creators": []
    }
    for creator in creators:
        creator_dict = creator.to_dict()
        creator_book_dict = [book.to_dict() for book in creator.books]
        creator_dict["Books"] = creator_book_dict
        response["Creators"].append(creator_dict)


    return response

@creator_routes.route('', methods=["POST"])
def create_creator():
    # pass
    """
    Queries the Database for creator,
    if Creator is found, compares/updates
    """
    data = request.get_json()
    creator_form = CreatorForm()
    creator_form['csrf_token'].data = request.cookies['csrf_token']
    # Search to see if Creator Exists, if not,  update/add entry
    # Skipping this for now since this isn't a core feature.
    # try:
    #     new_creator = Creator.query.filter_by(name)
    # except:
    #     return {'message': "Book couldn't be found"}, 404
    # else:
    if creator_form.validate_on_submit():
        new_creator = Creator(
            role = creator_form.data["role_type_list"],
            name = creator_form.data["name"],
            creator_image_url = creator_form.data["creator_image_url"],
            summary = creator_form.data["creator_summary"]
        )
        db.session.add(new_creator)
        db.session.commit()

        response = new_creator.to_dict()
        return response
    # print( creator_form.errors)
    return {'errors': validation_errors_to_error_messages(creator_form.errors)}, 401



@creator_routes.route('<int:creatorId>', methods=["PUT"])
def edit_creator(creatorId):
    # pass
    """
    """
    data = request.get_json()
    creator_form = CreatorForm()
    creator_form['csrf_token'].data = request.cookies['csrf_token']
    try:
        edit_creator = Creator.query.get_or_404(creatorId)
    except:
        return {'message': "Creator couldn't be found"}, 404
    else:
        if creator_form.validate_on_submit():
            if creator_form.data["role_type_list"]:
                edit_creator.role = creator_form.data["role_type_list"]
            if creator_form.data["name"]:
                edit_creator.name = creator_form.data["name"]
            if creator_form.data["creator_image_url"]:
                edit_creator.creator_image_url = creator_form.data["creator_image_url"]
            if creator_form.data["creator_summary"]:
                edit_creator.summary = creator_form.data["creator_summary"]

            db.session.commit()
            response = edit_creator.to_dict()
            return response
        return {'errors': validation_errors_to_error_messages(creator_form.errors)}, 401

@creator_routes.route('<int:creatorId>', methods=["DELETE"])
def delete_creator(creatorId):
    # return test
    # pass
    """
    """
    try:
        creator_to_delete = Creator.query.get_or_404(creatorId)
    except:
        return {'message': "Creator couldn't be found"}, 404
    else:
        db.session.delete(creator_to_delete)
        db.session.commit()
        return {'message': "Successfully deleted"}, 200


@creator_routes.route('<int:creatorId>/books', methods=["POST"])
def add_book_to_creator(creatorId):
    pass
    """
    """
    data = request.get_json()
    try:
        creator_to_add = Creator.query.get_or_404(int(creatorId))
    except:
        return {"message": "Creator couldn't be found"}, 404
    try:
        book_to_add = Book.query.order_by(Book.id.desc()).options(joinedload(Book.creators)).get_or_404(int(data["bookId"]))
    except:
        return {"message": "Book couldn't be found"}, 404

    # creator_dict = creator_to_add.to_dict()
    if creator_to_add in book_to_add.creators:
        return {"message": "Creator already associated with book!"}
    else:
        book_to_add.creators.append(creator_to_add)
        db.session.commit()
        return {"message": "Creator successfully associated with book!"}




@creator_routes.route('<int:creatorId>/books', methods=["DELETE"])
def remove_book_from_creator(creatorId):
    # pass
    """
    """
    data = request.get_json()
    try:
        creator_to_remove = Creator.query.get_or_404(int(creatorId))
    except:
        return {"message": "Creator couldn't be found"}, 404

    try:
        book_to_add = Book.query.order_by(Book.id.desc()).options(joinedload(Book.creators)).get_or_404(int(data["bookId"]))
    except:
        return {"message": "Book couldn't be found"}, 404

    # creator_dict = creator_to_add.to_dict()
    if creator_to_remove in book_to_add.creators:
        book_to_add.creators.remove(creator_to_remove)
        db.session.commit()
        return {"message": "Creator successfully dis-associated with book!"}
    else:
        return {"message": "Creator already dis-associated with book!"}
