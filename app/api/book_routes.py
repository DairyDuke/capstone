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


book_routes = Blueprint('books', __name__)


# GET - Gets all Books available on website.
@book_routes.route('', methods=["GET"])
def all_books():
    # pass
    """
     Queries the database for all available books,
     pulling their respective covers and creator lists.
    """
    books = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered)).all()

    response = {
      "Books": []
    }

    for book in books:
        book_dict = book.to_dict()
        book_creators_dict = [creator.to_dict() for creator in book.creators]
        book_cover_dict = [cover.to_dict_less() for cover in book.covered]
        book_dict['Cover'] = book_cover_dict[0]['coverImageUrl']
        book_dict['Creators'] = book_creators_dict


        response["Books"].append(book_dict)

    return jsonify(response)

# GET - Gets specific Book details.
@book_routes.route('/<int:bookId>', methods=["GET"])
def book_details(bookId):
    # pass
    try:
      single_book = Book.query.order_by(Book.created_at.desc()).options(joinedload(Book.creators), joinedload(Book.covered), joinedload(Book.reviewed)).get_or_404(bookId)
    except:
        return {'message': "Book couldn't be found"}, 404
    else:
      single_data = single_book.to_dict()
      # single_book.creators.to_dict()
      # single_book.covered.to_dict_less()
      response = single_data
      single_data_cover = [cover.to_dict_less() for cover in single_book.covered]
      response['Cover'] = single_data_cover[0]['coverImageUrl']
      response['Creators'] = [creator.to_dict() for creator in single_book.creators]
      response['Reviewed'] = [review.to_dict() for review in single_book.reviewed]
      # single_book.reviewed.to_dict()

      return response


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
    book_form = BookForm()
    book_form['csrf_token'].data = request.cookies['csrf_token']
    # creator_form = CreatorForm()
    # creator_form['csrf_token'].data = request.cookies['csrf_token']
    try:
      new_book = Book.query.filter_by(title=book_form.data['title']).first()
      print(new_book)
      if new_book == None:
          raise Exception()
      # creator_form
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

          return {'message': "Everything good"}, 200

        return {'errors': "nothing is working here"}, 400
    else:
        return {'message': "Book already exists!"}, 300





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
