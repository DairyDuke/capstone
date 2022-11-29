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


book_routes = Blueprint('creator', __name__)


# GET - Gets all Books available on website.
@book_routes.route('', methods=["GET"])
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
        print(current_user)
        print(filtered_user_list)
        # book_user = book_user_dict.filter(x => currentuser.id = x.userId)
        if current_user.get_id():
          filtered_user_list = filter(lambda shelf: current_user and shelf.id == current_user.get_id(), book_user_dict)
          shelf_location = filtered_user_list[0]
          [shelf.userId == current_user.get_id() for shelf in book_user_dict]
        else:
          shelf_location = "unread"
        book_dict['Shelved'] = shelf_location

        # Getting the average review rating.
        book_review_dict = []
        [book_review_dict.append(review.to_dict_rating()) for review in book.reviewed]
        book_dict['AverageRating'] = sum(book_review_dict) / len(book_review_dict)

        response["Books"].append(book_dict)

    return jsonify(response)

# GET - Gets specific Book details.
@book_routes.route('/<int:bookId>', methods=["GET"])
def book_details(bookId):
    # pass
    try:
      single_book = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.shelved), joinedload(Book.reviewed)).get_or_404(bookId)
    except:
        return {'message': "Book couldn't be found"}, 404
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
          shelf_location = [shelf.userId == current_user.get_id() for shelf in shelves]
      else:
          shelf_location = "unread"

      response['Shelved'] = shelf_location
      # single_book.reviewed.to_dict()

      return response


# POST- Creates a new book.
@book_routes.route('', methods=["POST"])
def create_author():
    """
    """
    # We've created a new book, now to assign the author.
    # Grab the Creator form
    creator_form = CreatorForm()
    # Assign the csrf token
    creator_form['csrf_token'].data = request.cookies['csrf_token']
    try:
        new_creator = Book.query.filter_by(title=book_form.data['title']).first()
        print(new_book)
        if new_book == None:
            raise Exception()
            # creator_form
    except:
        pass
    else:
        pass
            # role_type_list
            # name
            # creator_image_url
            # author_summary
    # pass
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    try:
      new_book = Book.query.filter_by(title=book_form.data['title']).first()
      print(new_book)
      if new_book == None:
          raise Exception()
    except:
        if book_form.validate_on_submit():
          new_book = Book(
            title=book_form.data['title'],
            genre=book_form.data['genre'],
            summary=book_form.data['summary']
          )
          db.session.add(new_book)
          db.session.commit()

          if book_form.data['cover_image_url']:
              new_book_cover = BookCover(
                book_id= new_book.id,
                cover_image_url = book_form.data['cover_image_url']
              )
          else:
              new_book_cover = BookCover(
                book_id= new_book.id,
                cover_image_url = ""
              )
          db.session.add(new_book_cover)
          db.session.commit()
          # We've created a new book, now to assign the author.
          # Grab the Creator form
          creator_form = CreatorForm()
          # Assign the csrf token
          creator_form['csrf_token'].data = request.cookies['csrf_token']

          try:
            new_creator = Book.query.filter_by(title=book_form.data['title']).first()
            print(new_book)
            if new_book == None:
              raise Exception()
            # creator_form
          except:
            pass
          else:
            pass
            # role_type_list
            # name
            # creator_image_url
            # author_summary


          return {'message': "Everything good"}, 200

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        return {'message': "Book already exists!"}, 300


# PUT - Edits a current Book entry.
@book_routes.route('/<int:bookId>', methods=["PUT"])
def edit_book(bookId):
    # pass
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    try:
        current_book = Book.query.get_or_404(bookId)
    except:
        return {'message': "Book couldn't be found"}, 404
    else:
        if book_form.validate_on_submit():
            if book_form.data['title']:
                current_book.title = book_form.data['title']
            if book_form.data['genre']:
                current_book.genre = book_form.data['genre']
            if book_form.data['summary']:
                current_book.summary = book_form.data['summary']
            current_book.updated_at = datetime.utcnow()
            if book_form.data['cover_image_url']:
                current_book_cover = BookCover.query.get(bookId)
                current_book_cover = book_form.data['cover_image_url']

            db.session.commit()

            return {'message': "Everything good"}, 200

        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # creator_form = CreatorForm()
    # creator_form['csrf_token'].data = request.cookies['csrf_token']


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
