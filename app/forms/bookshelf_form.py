from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class BookshelfForm(FlaskForm):
    bookshelf_name = StringField("Title", validators=[Length(
        max=100), DataRequired()])
