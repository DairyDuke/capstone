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


book_routes = Blueprint("books", __name__)


# GET - Gets all Books available on website.
@book_routes.route('')
def all_books():
    # pass
    """
     Queries the database for all available books,
     pulling their respective covers and creator lists.
    """
    books = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.shelved), joinedload(Book.reviewed)).all()

    response = {
      "Books": []
    }

    for book in books:
        # Convert book data to usable data
        book_dict = book.to_dict()
        #Convert Creator and Cover data to be usable
        book_creators_dict = [creator.to_dict() for creator in book.creators]
        book_cover_dict = [cover.to_dict_less() for cover in book.covered]
        book_dict['Cover'] = book_cover_dict[0]
        book_dict['Creators'] = book_creators_dict

        # book_user_dict = [bookshelf.]
        # Need to confirm shelf ownership
        book_user_dict = [shelf.to_dict() for shelf in book.shelved]
        # print(current_user)
        # print(filtered_user_list)
        # book_user = book_user_dict.filter(x => currentuser.id = x.userId)
        if current_user.get_id():
          filtered_user_list = list(filter(lambda shelf: int(shelf["userId"]) == int(current_user.get_id()) and shelf["protected"] == 1, book_user_dict))
          shelf_location = filtered_user_list
        #   [shelf.userId == current_user.get_id() for shelf in book_user_dict]
        else:
          shelf_location = "unread"
        book_dict['Shelved'] = shelf_location

        # Getting the average review rating.
        book_review_dict = []
        [book_review_dict.append(review.to_dict_rating()) for review in book.reviewed]
        if len(book_review_dict) > 0:
            book_dict['AverageRating'] = sum(book_review_dict) / len(book_review_dict)
        else:
            book_dict['AverageRating'] = 0

        response["Books"].append(book_dict)

    return jsonify(response)


# POST- Creates a new book.
@book_routes.route('', methods=["POST"])
def create_book():
    """
    Queries the database to check if book exists.
    If it doesn't creates the book.
    First adds it to the database, then adds the cover.
    Queries the database for the Author, if author is not found,
    creates a new author before creating the association.
    Else, just creates an association.
    """
    # pass
    data = request.get_json()
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']

    new_book = Book.query.filter_by(title=book_form.data['title']).first()
    # print(new_book)
    if new_book:
        return {'errors':{'message': "Book already exists!"}}, 300

    if book_form.validate_on_submit():
        new_book = Book(
        title=book_form.data['title'],
        genre=book_form.data['genre'],
        summary=book_form.data['summary']
        )
        db.session.add(new_book)
        db.session.commit()
        if book_form.data['coverImageURL']:
            new_book_cover = BookCover(
            book_id= new_book.id,
            cover_image_url = book_form.data['coverImageURL']
            )
        else:
            new_book_cover = BookCover(
            book_id= new_book.id,
            cover_image_url = ""
            )
        db.session.add(new_book_cover)
        db.session.commit()
        response = new_book.to_dict()
        response['cover_image_url'] = new_book_cover.to_dict_less()
        return response
    return {'errors': validation_errors_to_error_messages(book_form.errors)}, 401


# GET - Gets specific Book details.
@book_routes.route('/<int:bookId>', methods=["GET"])
def book_details(bookId):
    # pass
    try:
      single_book = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.shelved), joinedload(Book.reviewed)).get_or_404(bookId)
    except:
        return {'errors':{'message': "Book couldn't be found"}}, 404
    else:
      single_data = single_book.to_dict()
      # single_book.creators.to_dict()
      # single_book.covered.to_dict_less()
      response = single_data
      single_data_cover = [cover.to_dict_less() for cover in single_book.covered]
      response['Cover'] = single_data_cover[0]
      response['Creators'] = [creator.to_dict() for creator in single_book.creators]
      response['Reviewed'] = [review.to_dict() for review in single_book.reviewed]
      shelves = [shelf.to_dict() for shelf in single_book.shelved]
      if current_user.get_id():
          shelf_location = [shelf["userId"] == current_user.get_id() for shelf in shelves]
      else:
          shelf_location = "unread"

      response['Shelved'] = shelf_location
      # single_book.reviewed.to_dict()

      return response

# PUT - Edits a current Book entry.
@book_routes.route('/<int:bookId>', methods=["PUT"])
def edit_book(bookId):
    # pass
    data = request.get_json()
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    try:
        current_book = Book.query.get_or_404(bookId)
        current_book_Cover = BookCover.query.filter_by(book_id=bookId).first()
    except:
        return {'errors':{'message': "Book couldn't be found"}}, 404
    else:
        if book_form.validate_on_submit():
            if book_form.data['title']:
                current_book.title = book_form.data['title']
            if book_form.data['genre']:
                current_book.genre = book_form.data['genre']
            if book_form.data['summary']:
                current_book.summary = book_form.data['summary']
            current_book.updated_at = datetime.utcnow()
            if book_form.data['coverImageURL']:
                current_book_Cover.cover_image_url = book_form.data['coverImageURL']

            db.session.commit()
            response = current_book.to_dict()
            response['cover_image_url'] = current_book_Cover.cover_image_url
            return response

        errorReturn = {'errors': validation_errors_to_error_messages(book_form.errors)}, 401

        return {'errors': validation_errors_to_error_messages(book_form.errors)}, 401


# DELETE - Deletes a current Book entry.
@book_routes.route('/<int:bookId>', methods=["DELETE"])
def delete_book(bookId):
    # pass
    try:
        book_to_delete = Book.query.get_or_404(bookId)
    except:
        return {'message': "Book couldn't be found"}, 404
    else:

        db.session.delete(book_to_delete)
        db.session.commit()
        return {'message': "Successfully deleted"}, 200



# ################################################### #
#                 # Bookshelves #                     #
# ################################################### #

# POST - Adds a Book to a User's Bookshelf.
@book_routes.route('/<int:bookId>/bookshelf', methods=["POST"])
def add_book_to_shelf(bookId):
    """
    Queries database for user bookshelves,
    checks to see if book is currently in one of the three 'Exclusive' shelves,
    then makes the appropriate association.
    """
    data = request.get_json()
    try:
        book_to_add = Book.query.get_or_404(bookId)
        user_shelves = Bookshelf.query.order_by(Bookshelf.id.desc()).options(joinedload(Bookshelf.stacks),joinedload(Bookshelf.user)).filter_by(user_id=current_user.get_id()).all()
    except:
        return {"message": "Book couldn't be found"}, 404


    book_dict_message = book_to_add.to_dict()
    if data["bookshelf_name"]:
        response = {"message": f"{book_dict_message['title']} successfully added to {data['bookshelf_name']}!"}
    elif data["custom_bookshelf_name"]:
        response = {"message": f"{book_dict_message['title']} successfully added to {data['custom_bookshelf_name']}!"}

    for shelf in user_shelves:
        shelf_dict = shelf.to_dict()
        # Staple Bookshelf Route
        if data["bookshelf_name"] == shelf_dict["bookshelfName"]:
            if book_to_add in shelf.stacks:
                response = {"message": "Book already on shelf!"}
            else:
             shelf.stacks.append(book_to_add)
        elif book_to_add in shelf.stacks:
            if shelf_dict["protected"] == True:
                shelf.stacks.remove(book_to_add)
        # Custom Bookshelf Route
        if data["custom_bookshelf_name"] == shelf_dict["bookshelfName"]:
            if book_to_add in shelf.stacks:
                response = {"message": "Book already on shelf!"}
            else:
             shelf.stacks.append(book_to_add)
        # elif book_to_add in shelf.stacks:
        #     if shelf_dict["protected"] == True:
        #         shelf.stacks.remove(book_to_add)

    #     shelf_dict["books"] = []
    #     for stack in shelf.stacks:
    #         shelf_dict["books"].append(stack.to_dict())
    #         if int(stack.id) == int(bookId):
    #                 print("This printed true")
    #             book_location["Locations"].append( {
    #                 "id" : shelf.id,
    #                 "bookshelf_name" : shelf.bookshelf_name
    #             })

    #     response["Test"].append(shelf_dict)
    # response["Test"].append(book_location)

    db.session.commit()
    return response
    # return "cool"
    # books = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.shelved), joinedload(Book.reviewed)).all()

# DELETE - Removes a Book from a User's Bookshelf.
@book_routes.route('/<int:bookId>/bookshelf', methods=["DELETE"])
def remove_book_from_shelf(bookId):
    """
    Queries database for user bookshelves,
    checks to see if book is currently in one of the three 'Exclusive' shelves,
    then makes the appropriate association.
    """
    data = request.get_json()
    try:
        book_to_add = Book.query.get_or_404(bookId)
        user_shelves = Bookshelf.query.order_by(Bookshelf.id.desc()).options(joinedload(Bookshelf.stacks),joinedload(Bookshelf.user)).filter_by(user_id=current_user.get_id()).all()
    except:
        return {"message": "Book couldn't be found"}, 404

    book_dict_message = book_to_add.to_dict()
    if data["bookshelf_name"]:
        response = {"message": f"{book_dict_message['title']} successfully removed from {data['bookshelf_name']}!"}
    elif data["custom_bookshelf_name"]:
        response = {"message": f"{book_dict_message['title']} successfully removed from {data['custom_bookshelf_name']}!"}


    for shelf in user_shelves:
        shelf_dict = shelf.to_dict()
        # Staple Bookshelf Route
        if data["bookshelf_name"] == shelf_dict["bookshelfName"]:
            if book_to_add in shelf.stacks:
                shelf.stacks.remove(book_to_add)
            # else:
            #     response = {"message": "Book already on shelf!"}
            #  shelf.stacks.append(book_to_add)
        elif book_to_add in shelf.stacks:
            if shelf_dict["protected"] == True:
                shelf.stacks.remove(book_to_add)
        # Custom Bookshelf Route
        if data["custom_bookshelf_name"] == shelf_dict["bookshelfName"]:
            if book_to_add in shelf.stacks:
                shelf.stacks.remove(book_to_add)
        if data["bookshelf_name"] == "all":
            if book_to_add in shelf.stacks:
                shelf.stacks.remove(book_to_add)
            # else:
            #  shelf.stacks.append(book_to_add)
        # elif book_to_add in shelf.stacks:
        #     if shelf_dict["protected"] == True:
        #         shelf.stacks.remove(book_to_add)

    #     shelf_dict["books"] = []
    #     for stack in shelf.stacks:
    #         shelf_dict["books"].append(stack.to_dict())
    #         if int(stack.id) == int(bookId):
    #                 print("This printed true")
    #             book_location["Locations"].append( {
    #                 "id" : shelf.id,
    #                 "bookshelf_name" : shelf.bookshelf_name
    #             })

    #     response["Test"].append(shelf_dict)
    # response["Test"].append(book_location)

    db.session.commit()
    return response
    # return "cool"
    # books = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.shelved), joinedload(Book.reviewed)).all()


# @book_routes.route('', defaults={'path': ''})
# @book_routes.route('/favicon.png', method=["GET"])
# def react_root():
#     """
#     This route will direct to the public directory in our
#     react builds in the production environment for favicon
#     or index.html requests
#     """
#     print(".........................................")
#     if path == '/books/favicon.ico':
#         return app.send_from_directory('public', 'favicon.png')
#     return app.send_static_file('index.html')

# ------------------------------------------------------------
# Review Routes - (that have a prefix of /books/:bookId)
# ------------------------------------------------------------

# Route - Get all reviews of a post:
@book_routes.route('/<int:id>/reviews', methods=['GET'])
def get_all_reviews(id):
    pass


# Route - Add a review to a book:
@book_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def add_review(id):
    pass
